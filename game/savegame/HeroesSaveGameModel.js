import ObjectModel from "wgge/core/model/ObjectModel";
import LocationsModel from "./location/LocationsModel";
import FactionsModel from "./faction/FactionsModel";
import TravelModel from "./travel/TravelModel";
import JournalModel from "./journal/JournalModel";
import RiversModel from "./river/RiversModel";

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

	/**
	 * @type JournalModel
	 */
	journal;

	constructor() {
		super(true);

		this.travel = this.addProperty('travel', new TravelModel());
		this.locations = this.addProperty('locations', new LocationsModel());
		this.factions = this.addProperty('factions', new FactionsModel());
		this.rivers = this.addProperty('rivers', new RiversModel());

		this.journal = this.addProperty('journal', new JournalModel());
		this.journal.addOnDirtyListener(() => this.travel.makeDirty());

	}

}

