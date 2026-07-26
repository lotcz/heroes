import ObjectModel from "wgge/core/model/ObjectModel";
import FactionsModel from "./faction/FactionsModel";
import TravelModel from "./travel/TravelModel";
import JournalModel from "./journal/JournalModel";
import PartyModel from "./units/party/PartyModel";

export default class HeroesSaveGameModel extends ObjectModel {

	/**
	 * @type PartyModel
	 */
	party;

	/**
	 * @type TravelModel
	 */
	travel;

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

		this.party = this.addProperty('party', new PartyModel());
		this.party.position.addOnChangeListener(() => this.travel.partyPosition.set(this.party.position), true);

		this.travel = this.addProperty('travel', new TravelModel());
		this.factions = this.addProperty('factions', new FactionsModel());

		this.journal = this.addProperty('journal', new JournalModel());
		this.journal.addOnDirtyListener(() => this.travel.makeDirty());

	}

	logAction(action) {
		this.journal.actionLog.add(action);
	}

}

