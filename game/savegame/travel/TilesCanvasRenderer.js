import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";
import Vector2 from "wgge/core/model/vector/Vector2";
import Dictionary from "wgge/core/Dictionary";

export default class TilesCanvasRenderer extends CanvasRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	/**
	 * @type BiotopesResource
	 */
	biotopes;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;
		this.biotopes = this.game.resources.biotopes;
		this.canvasView = this.model.travelView.main;

		this.biotopesTextures = new Dictionary();
		this.locationTextures = new Dictionary();
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
			'img/character/knight.png',
			(img) => {
				this.knight = img;
				this.renderInternal();
			}
		);
	}

	renderTile(tile) {
		if (tile.discovered.equalsTo(0)) return;
		const tileStart = tile.position
			.multiply(this.model.tileSizePx.get())
			.subtract(this.model.viewCenterOffsetPx)
			.add(this.canvasView.canvasCenter)
			.round();
		const tileSize = new Vector2(this.model.tileSizePx.get(), this.model.tileSizePx.get());

		const texture = this.biotopesTextures.get(tile.biotopeId.get());
		if (texture) {
			this.drawRect(tileStart, tileSize, texture);
		}

		if (tile.location.isSet()) {
			const location = tile.location.get();
			if (!this.locationTextures.exists(location.image.get())) {
				this.game.assets.loadImage(
					location.image.get(),
					(texture) => {
						if (!this.locationTextures.exists(location.image.get())) {
							this.locationTextures.set(location.image.get(), texture);
						}
						this.renderInternal();
					}
				);
				return;
			}
			const locationTexture = this.locationTextures.get(location.image.get());
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
		if (this.model.viewCenterOffsetPx.isDirty) {
			this.biotopesTextures.forEach(
				(id, texture) => {
					const matrix = new DOMMatrix();
					matrix.translateSelf(-this.model.viewCenterOffsetPx.x, -this.model.viewCenterOffsetPx.y);
					texture.setTransform(matrix);
				}
			);
		}

		// tiles
		const tilesInView = this.canvasView.canvasSize.multiply(1 / this.model.tileSizePx.get());
		const tilesViewCenter = tilesInView.multiply(0.5);
		const tilesViewStart = this.model.viewCenterTile.subtract(tilesViewCenter);

		const start = new Vector2(Math.floor(tilesViewStart.x), Math.floor(tilesViewStart.y));
		const size = new Vector2(Math.ceil(tilesInView.x), Math.ceil(tilesInView.y));

		this.model.tiles.forEach(
			(tile) => {
				if (tile.position.isInside(start, size)) {
					this.renderTile(tile);
				}
			}
		);

		// hero
		if (this.knight && this.model.hero.isInside(start, size)) {
			const tileStart = this.model.hero
				.multiply(this.model.tileSizePx.get())
				.subtract(this.model.viewCenterOffsetPx)
				.add(this.canvasView.canvasCenter)
				.round();
			const tileSize = new Vector2(this.model.tileSizePx.get(), this.model.tileSizePx.get());

			this.drawImage(
				this.knight,
				tileStart,
				tileSize,
				new Vector2(0, 0),
				new Vector2(this.knight.width, this.knight.height),
				1,
				false
			);
		}
	}

}
