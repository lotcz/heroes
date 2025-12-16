import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import TravelController from "./travel/TravelController";

export default class HeroesSaveGameController extends ControllerBase {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(new TravelController(game, model));
	}

}
