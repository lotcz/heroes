import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";
import Vector2 from "wgge/core/model/vector/Vector2";
import Dictionary from "wgge/core/Dictionary";

export default class TilesCanvasRenderer extends CanvasRenderer {

	/**
	 * @type TravelModel
	 */
	model;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;
		this.canvasView = this.model.mainView;

		this.biotopesTextures = new Dictionary();
		this.imageCache = new Dictionary();
		this.cornerMasks = new Dictionary();
	}

	activateInternal() {
		this.game.resources.biotopes.forEach(
			(biotope) => {
				this.game.assets.loadImage(
					biotope.texture.get(),
					(texture) => {
						this.biotopesTextures.set(biotope.id.get(), this.context2d.createPattern(texture, 'repeat'));
						this.renderInternal();
					}
				);
				biotope.decorations.forEach(
					(decor) => {
						this.game.assets.loadImage(
							decor.image.get(),
							(texture) => {
								this.imageCache.set(decor.image.get(), texture);
								this.renderInternal();
							}
						);
					}
				);
			}
		);

		this.game.resources.races.forEach(
			(race) => {
				this.game.assets.loadImage(
					race.townImage.get(),
					(texture) => {
						this.imageCache.set(race.townImage.get(), texture);
						this.renderInternal();
					}
				);
			}
		);

		this.game.resources.cornerMasks.forEach(
			(mask) => {
				this.game.assets.loadImage(
					mask.image.get(),
					(texture) => {
						this.cornerMasks.set(mask.id.get(), texture);
						this.renderInternal();
					}
				);
			}
		);

		this.game.assets.loadImage(
			'img/character/wizard.png',
			(img) => {
				this.knight = img;
				this.renderInternal();
			}
		);

		this.game.assets.loadImage(
			'img/character/ship.png',
			(img) => {
				this.ship = img;
				this.renderInternal();
			}
		);
	}

	renderCorner(corner, start) {
		const mask = this.cornerMasks.get(corner.maskId.get());
		const bg = this.biotopesTextures.get(corner.backgroundBiotopeId.get());
		if (mask) {
			this.context2d.globalCompositeOperation = 'source-over';
			this.drawImage(
				mask,
				start,
				this.model.tiles.tileSizeHalf,
				new Vector2(0, 0),
				new Vector2(mask.width, mask.height),
				1,
				false
			);
			this.context2d.globalCompositeOperation = 'source-atop';
			this.drawRect(start, this.model.tiles.tileSizeHalf, bg ? bg : 'black');
		}
	}

	renderTile(tile) {
		const tileStart = tile.position
			.multiply(this.model.tiles.tileSizePx.get())
			.subtract(this.model.tiles.viewCenterOffsetPx)
			.add(this.canvasView.canvasCenter)
			.subtract(this.model.tiles.tileSizeHalf)
			.round();

		// corners
		if (tile.corners.cornerA.isSet()) {
			this.renderCorner(tile.corners.cornerA.get(), tileStart);
		}
		if (tile.corners.cornerB.isSet()) {
			this.renderCorner(tile.corners.cornerB.get(), new Vector2(tileStart.x + this.model.tiles.tileSizeHalf.x, tileStart.y));
		}
		if (tile.corners.cornerC.isSet()) {
			this.renderCorner(tile.corners.cornerC.get(), new Vector2(tileStart.x, tileStart.y + this.model.tiles.tileSizeHalf.y));
		}
		if (tile.corners.cornerD.isSet()) {
			this.renderCorner(tile.corners.cornerD.get(), tileStart.add(this.model.tiles.tileSizeHalf));
		}

		// texture
		const texture = this.biotopesTextures.get(tile.biotopeId.get());
		if (texture) {
			this.context2d.globalCompositeOperation = 'destination-over';
			this.drawRect(tileStart, this.model.tiles.tileSize, texture);
		}

		this.context2d.globalCompositeOperation = 'source-over';

		// decoration
		if (tile.decor.isSet()) {
			const decor = tile.decor.get();
			const decorTexture = this.imageCache.get(decor.image.get());
			if (decorTexture) {
				this.drawImage(
					decorTexture,
					tileStart,
					this.model.tiles.tileSize,
					new Vector2(0, 0),
					new Vector2(decorTexture.width, decorTexture.height),
					1,
					false
				);
			}
		}

		// location
		if (tile.location.isSet()) {
			const location = tile.location.get();
			const locationTexture = this.imageCache.get(location.image.get());
			if (locationTexture) {
				this.drawImage(
					locationTexture,
					tileStart,
					this.model.tiles.tileSize,
					new Vector2(0, 0),
					new Vector2(locationTexture.width, locationTexture.height),
					1,
					false
				);
			}
		}

		// fog of war
		if (tile.discovered.get() < 1) {
			this.drawRect(
				tileStart,
				this.model.tiles.tileSize,
				`rgba(0, 0, 0, ${1 - tile.discovered.get()})`
			);
		}
	}

	renderInternal() {
		// clear
		this.context2d.clearRect(0, 0, this.canvasView.canvasSize.x, this.canvasView.canvasSize.y);

		// texture offset
		if (this.model.tiles.viewCenterOffsetPx.isDirty) {
			this.biotopesTextures.forEach(
				(id, texture) => {
					const matrix = new DOMMatrix();
					matrix.translateSelf(-this.model.tiles.viewCenterOffsetPx.x, -this.model.tiles.viewCenterOffsetPx.y);
					texture.setTransform(matrix);
				}
			);
		}

		// tiles
		const tilesInView = this.canvasView.canvasSize.multiply(1 / this.model.tiles.tileSizePx.get());
		const tilesViewCenter = tilesInView.multiply(0.5);
		const tilesViewStart = this.model.tiles.viewCenterTile.subtract(tilesViewCenter);

		const start = new Vector2(Math.floor(tilesViewStart.x), Math.floor(tilesViewStart.y));
		const size = new Vector2(Math.ceil(tilesInView.x), Math.ceil(tilesInView.y));
		const end = start.add(size);

		for (let x = start.x; x <= end.x; x++) {
			for (let y = start.y; y <= end.y; y++) {
				const tile = this.model.tiles.getTile(x, y);
				if (tile && tile.discovered.get() > 0) {
					this.renderTile(tile);
				}
			}
		}

		// hero
		if (this.model.heroPosition.isInside(start, size)) {
			const tile = this.model.tiles.getTile(this.model.heroPosition);
			const image = tile.heightLevel.get() > 0 ? this.knight : this.ship;
			if (!image) return;

			const tileSize = new Vector2(this.model.tiles.tileSizePx.get(), this.model.tiles.tileSizePx.get());
			const tileStart = this.model.heroPosition
				.multiply(this.model.tiles.tileSizePx.get())
				.subtract(this.model.tiles.viewCenterOffsetPx)
				.add(this.canvasView.canvasCenter)
				.add(tileSize.multiply(-0.5))
				.round();

			this.drawImage(
				image,
				tileStart,
				tileSize,
				new Vector2(0, 0),
				new Vector2(image.width, image.height),
				1,
				false
			);
		}
	}

}
