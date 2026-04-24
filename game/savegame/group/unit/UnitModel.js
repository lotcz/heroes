import IntValue from "wgge/core/model/value/IntValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import NullableNode from "wgge/core/model/value/NullableNode";
import UnitStatsModel from "./UnitStatsModel";
import StringValue from "wgge/core/model/value/StringValue";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class UnitModel extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type BoolValue
	 */
	sex;

	/**
	 * @type UnitStatsModel
	 */
	stats;

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
		this.sex = this.addProperty('sex', new BoolValue());
		this.stats = this.addProperty('stats', new UnitStatsModel());
		this.stats.addEventListener('death', () => this.triggerEvent('death', this));

		this.unitTypeId = this.addProperty('unitTypeId', new IntValue());
		this.unitType = this.addProperty('unitType', new NullableNode(null, false));

		this.factionId = this.addProperty('factionId', new IntValue());
		this.faction = this.addProperty('faction', new NullableNode(null, false));

	}

	isWalking() {
		return this.stats.walking.traitActive.get();
	}

	isSwimming() {
		return this.stats.swimming.traitActive.get();
	}

	isFlying() {
		return this.stats.flying.traitActive.get();
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
}
