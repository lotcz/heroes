import ObjectModel from "wgge/core/model/ObjectModel";
import FactionsModel from "./faction/FactionsModel";
import TravelModel from "./travel/TravelModel";
import JournalModel from "./journal/JournalModel";
import PartyModel from "./units/party/PartyModel";
import NullableNode from "wgge/core/model/value/NullableNode";
import LocationsModel from "./location/LocationsModel";
import MonsterGroupsModel from "./units/monsters/MonsterGroupsModel";
import RiversModel from "./river/RiversModel";
import BoolValue from "wgge/core/model/value/BoolValue";
import ItemSlotModel from "./inventory/slot/ItemSlotModel";

export default class HeroesSaveGameModel extends ObjectModel {

	/**
	 * @type PartyModel
	 */
	party;

	/**
	 * @type JournalModel
	 */
	journal;

	/**
	 * @type FactionsModel
	 */
	factions;

	/**
	 * @type LocationsModel
	 */
	locations;

	/**
	 * @type MonsterGroupsModel
	 */
	monsters;

	/**
	 * @type RiversModel
	 */
	rivers;

	/**
	 * @type NullableNode<UnitModel>
	 */
	selectedCharacter;

	/**
	 * @type BoolValue
	 */
	characterSheetOpen;

	/**
	 * @type ItemSlotModel
	 */
	selectedItem;

	/**
	 * @type TravelModel
	 */
	travel;

	constructor() {
		super(true);

		this.party = this.addProperty('party', new PartyModel());
		this.journal = this.addProperty('journal', new JournalModel());
		this.factions = this.addProperty('factions', new FactionsModel());
		this.locations = this.addProperty('locations', new LocationsModel());
		this.monsters = this.addProperty('monsters', new MonsterGroupsModel());
		this.rivers = this.addProperty('rivers', new RiversModel());

		this.selectedCharacter = this.addProperty('selectedCharacter', new NullableNode(null, false));
		this.characterSheetOpen = this.addProperty('characterSheetOpen', new BoolValue());
		this.selectedItem = this.addProperty('selectedItem', new ItemSlotModel());

		this.travel = this.addProperty('travel', new TravelModel());
		this.party.position.addOnChangeListener(() => this.travel.partyPosition.set(this.party.position), true);

	}

	logAction(action) {
		this.journal.actionLog.add(action);
	}

}

