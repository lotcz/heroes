import ControllerBase from "wgge/core/controller/ControllerBase";
import TravelController from "./travel/TravelController";
import CollectionController from "wgge/core/controller/CollectionController";
import FactionController from "./faction/FactionController";
import PartyController from "./units/party/PartyController";
import LocationController from "./location/LocationController";

export default class HeroesSaveGameController extends ControllerBase {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(new CollectionController(game, model.factions, (m) => new FactionController(game, m)));
		this.addChild(new CollectionController(game, this.model.locations, (m) => new LocationController(game, m)));

		this.addChild(new PartyController(game, this.model.party));

		// todo: deactivate when not in travel mode
		this.addChild(new TravelController(game, model));
	}

}
