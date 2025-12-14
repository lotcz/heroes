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
			this.game.controls,
			'key-down-82',
			() => this.model.randomize()
		);
	}

}
