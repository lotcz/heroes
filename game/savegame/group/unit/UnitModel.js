import IntValue from "wgge/core/model/value/IntValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import NullableNode from "wgge/core/model/value/NullableNode";
import UnitStatsModel from "./UnitStatsModel";
import StringValue from "wgge/core/model/value/StringValue";
import BoolValue from "wgge/core/model/value/BoolValue";
import UnitInventoryModel from "./UnitInventoryModel";

export default class UnitModel extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	portrait;

	/**
	 * @type BoolValue
	 */
	sex;

	/**
	 * @type UnitStatsModel
	 */
	stats;

	/**
	 * @type UnitInventoryModel
	 */
	inventory;

	/**
	 * @type IntValue
	 */
	unitTypeId;

	/**
	 * @type NullableNode<UnitTypeResource>
	 */
	unitType;

	/**
	 * @type IntValue
	 */
	factionId;

	/**
	 * @type NullableNode<FactionModel>
	 */
	faction;

	constructor() {
		super();

		this.name = this.addProperty('name', new StringValue());
		this.portrait = this.addProperty('portrait', new StringValue());
		this.sex = this.addProperty('sex', new BoolValue());
		this.stats = this.addProperty('stats', new UnitStatsModel());
		this.inventory = this.addProperty('inventory', new UnitInventoryModel());

		this.unitTypeId = this.addProperty('unitTypeId', new IntValue());
		this.unitType = this.addProperty('unitType', new NullableNode(null, false));

		this.factionId = this.addProperty('factionId', new IntValue());
		this.faction = this.addProperty('faction', new NullableNode(null, false));

		this.stats.addEventListener(
			'death',
			() => {
				const unitType = this.unitType.get();
				if (!unitType) {
					console.error('No unit type! Cannot drop loot!');
					return
				}
				unitType.loot.forEach((item) => this.triggerEvent('drop-item', item));
				this.dropAllItems();
				this.removeMyself();
			}
		);

	}

	isMale() {
		return this.sex.get() === true;
	}

	isFemale() {
		return this.sex.get() === false;
	}

	isGenderless() {
		return this.sex.isEmpty();
	}

	dropItem(itemSlot) {
		if (itemSlot.item.isSet()) {
			this.triggerEvent('drop-item', itemSlot.item.get());
			itemSlot.item.set(null);
		}
	}

	dropAllItems() {
		this.inventory.items.forEach(slot => this.dropItem(slot));
		this.dropItem(this.inventory.meleeWeapon);
		this.dropItem(this.inventory.rangedWeapon);
		this.dropItem(this.inventory.head);
		this.dropItem(this.inventory.body);
		this.dropItem(this.inventory.legs);
		this.dropItem(this.inventory.shoes);
		this.dropItem(this.inventory.talisman);

	}
}
