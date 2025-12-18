import ObjectModel from "wgge/core/model/ObjectModel";
import LocationsModel from "./location/LocationsModel";
import FactionsModel from "./faction/FactionsModel";
import TravelModel from "./travel/TravelModel";

export default class HeroesSaveGameModel extends ObjectModel {

	/**
	 * @type TravelModel
	 */
	travel;

	/**
	 * @type LocationsModel
	 */
	locations;

	/**
	 * @type FactionsModel
	 */
	factions;

	constructor() {
		super(true);

		this.travel = this.addProperty('travel', new TravelModel());
		this.locations = this.addProperty('locations', new LocationsModel());
		this.factions = this.addProperty('factions', new FactionsModel());

	}

}
