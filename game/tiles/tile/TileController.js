import ControllerBase from "wgge/core/controller/ControllerBase";

export default class TileController extends ControllerBase {

	/**
	 * @type TileModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;


	}

}
