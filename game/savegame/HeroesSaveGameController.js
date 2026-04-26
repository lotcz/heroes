import ControllerBase from "wgge/core/controller/ControllerBase";
import TravelController from "./travel/TravelController";
import CollectionController from "wgge/core/controller/CollectionController";
import FactionController from "./faction/FactionController";

export default class HeroesSaveGameController extends ControllerBase {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(new TravelController(game, model));
		this.addChild(new CollectionController(game, model.factions, (m) => new FactionController(game, m)));

	}

}
