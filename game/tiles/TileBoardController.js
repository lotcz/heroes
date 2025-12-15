import ControllerBase from "wgge/core/controller/ControllerBase";

export default class TileBoardController extends ControllerBase {

	/**
	 * @type TileBoardModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => {
				this.model.boardSize.set(
					Math.ceil(this.game.viewBoxSize.x / this.model.tileSize.get()),
					Math.ceil(this.game.viewBoxSize.y / this.model.tileSize.get()),
				);
				console.log('board size', this.model.boardSize.toString(0));
			},
			true
		);

		this.addAutoEvent(
			this.game.controls,
			'key-down-82',
			() => this.model.randomize(),
			true
		);

		this.addAutoEvent(
			this.game.controls,
			'key-down-80',
			() => this.model.perlin(),
			false
		);

		this.addAutoEvent(
			this.game.controls,
			'key-down-70',
			() => this.model.fractal(),
			false
		);


	}

}
