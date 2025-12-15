import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";
import Vector2 from "wgge/core/model/vector/Vector2";

export default class TilesCanvasRenderer extends CanvasRenderer {

	/**
	 * @type TileBoardModel
	 */
	model;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;

		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => {
				this.canvas.width = this.game.viewBoxSize.x;
				this.canvas.height = this.game.viewBoxSize.y;
				this.renderInternal();
			},
			true
		);
	}

	renderTile(tile) {
		this.drawRect(
			tile.position.multiply(this.model.tileSize.get()).add(new Vector2(1, 1)),
			new Vector2(this.model.tileSize.get() - 1, this.model.tileSize.get() - 1),
			tile.height.get() >= 0 ? `rgba(255, 255, 255, ${0.2 + 0.8 * tile.height.get() / 10})` : 'black'
		);
	}

	renderInternal() {
		this.context2d.clearRect(0, 0, this.game.viewBoxSize.x, this.game.viewBoxSize.y);
		this.model.tiles.forEach((tile) => this.renderTile(tile));
	}

}
