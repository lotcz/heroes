import ObjectModel from "wgge/core/model/ObjectModel";
import FactionsModel from "./faction/FactionsModel";
import TravelModel from "./travel/TravelModel";
import JournalModel from "./journal/JournalModel";
import PartyModel from "./units/party/PartyModel";
import NullableNode from "wgge/core/model/value/NullableNode";
import LocationsModel from "./location/LocationsModel";
import RiversModel from "./river/RiversModel";
import BoolValue from "wgge/core/model/value/BoolValue";
import ItemSlotModel from "./inventory/slot/ItemSlotModel";
import AllMonsterGroupsModel from "./units/monsters/AllMonsterGroupsModel";
import Vector2 from "wgge/core/model/vector/Vector2";

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
	 * @type AllMonsterGroupsModel
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
	 * @type NullableNode<TileModel>
	 */
	cursorTile;

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
		this.monsters = this.addProperty('monsters', new AllMonsterGroupsModel());
		this.rivers = this.addProperty('rivers', new RiversModel());

		this.selectedCharacter = this.addProperty('selectedCharacter', new NullableNode(null, false));
		this.characterSheetOpen = this.addProperty('characterSheetOpen', new BoolValue());
		this.selectedItem = this.addProperty('selectedItem', new ItemSlotModel());
		this.cursorTile = this.addProperty('cursorTile', new NullableNode(null, false));

		this.travel = this.addProperty('travel', new TravelModel());
		this.party.position.addOnChangeListener(() => this.travel.partyPosition.set(this.party.position), true);

		//this.addEventListener('start-turn', () => this.updateNearbyMonsters(), true);
		this.travel.tiles.viewCenterTile.addOnChangeListener(() => this.updateNearbyMonsters());
		this.travel.mainView.canvasSize.addOnChangeListener(() => this.updateNearbyMonsters());
		this.travel.tiles.tileSizePx.addOnChangeListener(() => this.updateNearbyMonsters());
		this.updateNearbyMonsters();

		this.party.addEventListener(
			'end-my-turn',
			() => {
				this.triggerEvent('end-turn');
			}
		);

		this.addEventListener(
			'start-turn',
			() => {
				this.party.triggerEvent('start-turn');
			}
		);

		this.party.addEventListener(
			'group-perished',
			() => {
				this.logAction('Game Over');
				this.party.stats.movement.consume();
			}
		);
	}

	logAction(action) {
		this.journal.actionLog.add(action);
	}

	updateNearbyMonsters() {
		const tilesInView = this.travel.mainView.canvasSize.multiply(1 / this.travel.tiles.tileSizePx.get());
		const tilesViewCenter = tilesInView.multiply(0.5);
		const tilesViewStart = this.travel.tiles.viewCenterTile.subtract(tilesViewCenter);

		const start = new Vector2(Math.floor(tilesViewStart.x), Math.floor(tilesViewStart.y));
		const size = new Vector2(Math.round(tilesInView.x + 1), Math.round(tilesInView.y + 1));

		this.monsters.forEach(
			(m) => {
				if (m.position.isInside(start, size)) {
					this.travel.nearbyMonsters.add(m);
				} else {
					this.travel.nearbyMonsters.remove(m);
				}
			}
		);
	}

}

