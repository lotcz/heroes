import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";
import Vector2 from "wgge/core/model/vector/Vector2";
import Dictionary from "wgge/core/Dictionary";

export default class MapRenderer extends CanvasRenderer {

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
		this.biotopesTextures = new Dictionary();

		this.canvasSize = new Vector2();
		this.tileSize = new Vector2();

	}

	activateInternal() {
		this.biotopes.forEach(
			(biotope) => {
				this.game.assets.loadImage(
					biotope.texture.get(),
					(texture) => this.biotopesTextures.set(biotope.id.get(), this.context2d.createPattern(texture, 'repeat'))
				);
			}
		);
	}

	renderTile(tile) {
		if (tile.discovered.equalsTo(0)) return;

		const tileStart = new Vector2(
			tile.position.x * this.tileSize.x,
			tile.position.y * this.tileSize.y
		);

		const texture = this.biotopesTextures.get(tile.biotopeId.get());
		if (texture) {
			this.drawRect(tileStart, this.tileSize, texture);
		}
/*
		if (tile.precipitationLevel.get() === 0) {
			this.drawCircle(
				tileStart.add(tileSize.multiply(0.5)),
				this.model.tileSizePx.get()/2,
				`red`
			);
		} else if (tile.precipitationLevel.get() === 2) {
			this.drawCircle(
				tileStart.add(tileSize.multiply(0.5)),
				this.model.tileSizePx.get()/2,
				`blue`
			);
		}
*/
		if (tile.discovered.get() < 1) {
			this.drawRect(
				tileStart,
				this.tileSize,
				`rgba(0, 0, 0, ${1 - tile.discovered.get()})`
			);
		}
	}

	renderInternal() {
		this.canvasSize.set(this.canvas.width, this.canvas.height);
		this.tileSize.set(
			this.canvasSize.x / this.model.boardSize.x,
			this.canvasSize.y / this.model.boardSize.y
		);

		// clear
		this.context2d.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y);

		// tiles
		this.model.tiles.forEach(
			(tile) => {
				this.renderTile(tile);
			}
		);

		// hero
		if (this.knight && this.model.hero.isInside(start, size)) {
			const tileStart = this.model.hero
				.multiply(this.model.tileSizePx.get())
				.subtract(this.model.viewCenterOffsetPx)
				.add(this.game.viewBoxCenter)
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
