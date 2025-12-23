import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";
import Vector2 from "wgge/core/model/vector/Vector2";
import Dictionary from "wgge/core/Dictionary";

export default class TilesCanvasRenderer extends CanvasRenderer {

	/**
	 * @type TravelModel
	 */
	model;

	/**
	 * @type TileDecorationsResource
	 */
	biotopes;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;
		this.biotopes = this.game.resources.biotopes;
		this.canvasView = this.model.mainView;

		this.biotopesTextures = new Dictionary();
		this.imageCache = new Dictionary();
	}

	activateInternal() {
		this.biotopes.forEach(
			(biotope) => {
				this.game.assets.loadImage(
					biotope.texture.get(),
					(texture) => {
						this.biotopesTextures.set(biotope.id.get(), this.context2d.createPattern(texture, 'repeat'));
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

	renderTile(tile) {
		const tileSize = new Vector2(this.model.tiles.tileSizePx.get(), this.model.tiles.tileSizePx.get());
		const tileStart = tile.position
			.multiply(this.model.tiles.tileSizePx.get())
			.subtract(this.model.tiles.viewCenterOffsetPx)
			.add(this.canvasView.canvasCenter)
			.add(tileSize.multiply(-0.5))
			.round();

		const texture = this.biotopesTextures.get(tile.biotopeId.get());
		if (texture) {
			this.drawRect(tileStart, tileSize, texture);
		}

		// decoration
		if (tile.decor.isSet()) {
			const decor = tile.decor.get();
			if (!this.imageCache.exists(decor.image.get())) {
				this.game.assets.loadImage(
					decor.image.get(),
					(texture) => {
						if (!this.imageCache.exists(decor.image.get())) {
							this.imageCache.set(decor.image.get(), texture);
						}
						this.renderInternal();
					}
				);
				return;
			}
			const decorTexture = this.imageCache.get(decor.image.get());
			this.drawImage(
				decorTexture,
				tileStart,
				tileSize,
				new Vector2(0, 0),
				new Vector2(decorTexture.width, decorTexture.height),
				1,
				false
			);
		}

		// location
		if (tile.location.isSet()) {
			const location = tile.location.get();
			if (!this.imageCache.exists(location.image.get())) {
				this.game.assets.loadImage(
					location.image.get(),
					(texture) => {
						if (!this.imageCache.exists(location.image.get())) {
							this.imageCache.set(location.image.get(), texture);
						}
						this.renderInternal();
					}
				);
				return;
			}
			const locationTexture = this.imageCache.get(location.image.get());
			this.drawImage(
				locationTexture,
				tileStart,
				tileSize,
				new Vector2(0, 0),
				new Vector2(locationTexture.width, locationTexture.height),
				1,
				false
			);
		}

		// fog of war
		if (tile.discovered.get() < 1) {
			this.drawRect(
				tileStart,
				tileSize,
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
