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

	activateInternal() {
		this.game.assets.loadImage(
			'img/knight.png',
			(img) => {
				this.knight = img;
				this.renderInternal();
			}
		);
	}

	getTileColor(tile) {
		/*
		if (tile.height.get() < -1.5) {
			return '#0871ac';
		}*/
		if (tile.height.get() < -0.5) {
			return '#02a2ff';
		}
		if (tile.height.get() <= 0) {
			return '#a5861b';
		}
		if (tile.height.get() <= 1.5) {
			return '#267311';
		}
		if (tile.height.get() <= 2.5) {
			return '#1a530b';
		}
		/*
		if (tile.height.get() >= 3.5) {
			return 'white';
		}*/
		return `rgba(255, 255, 255, ${0.2 + 0.8 * tile.height.get() / 10})`;
	}

	renderTile(tile) {
		const tileStart = tile.position.multiply(this.model.tileSize.get());
		this.drawRect(
			tileStart,
			new Vector2(this.model.tileSize.get(), this.model.tileSize.get()),
			this.getTileColor(tile)
		);
		if (tile.hasCity.get() > 0) {
			this.drawArc(
				tileStart.add(new Vector2(this.model.tileSize.get()/2, this.model.tileSize.get()/2)),
				this.model.tileSize.get()/2,
				'red',
				null
			);
		}
		if (tile.hasMonster.get() > 0) {
			this.drawArc(
				tileStart.add(new Vector2(this.model.tileSize.get()/2, this.model.tileSize.get()/2)),
				this.model.tileSize.get()/2,
				'blue',
				null
			);
		}
		if (this.model.hero.distanceTo(tile.position) === 0 && this.knight) {
			this.drawImage(
				this.knight,
				tileStart,
				new Vector2(this.model.tileSize.get(), this.model.tileSize.get()),
				new Vector2(0, 0),
				new Vector2(this.knight.width, this.knight.height),
				1,
				false
			);
		}
	}

	renderInternal() {
		this.context2d.clearRect(0, 0, this.game.viewBoxSize.x, this.game.viewBoxSize.y);
		this.model.tiles.forEach((tile) => this.renderTile(tile));
	}

}
