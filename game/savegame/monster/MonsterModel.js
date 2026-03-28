import IntValue from "wgge/core/model/value/IntValue";
import Vector2 from "wgge/core/model/vector/Vector2";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import NullableNode from "wgge/core/model/value/NullableNode";
import UnitStatsModel from "../../resources/stats/UnitStatsModel";
import StringValue from "wgge/core/model/value/StringValue";

export default class MonsterModel extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type Vector2
	 */
	position;

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
		this.position = this.addProperty('position', new Vector2());
		this.stats = this.addProperty('stats', new UnitStatsModel());

		// links
		this.unitTypeId = this.addProperty('unitTypeId', new IntValue());
		this.factionId = this.addProperty('factionId', new IntValue());

		// linked resources
		this.unitType = this.addProperty('unitType', new NullableNode(null, false));
		this.faction = this.addProperty('faction', new NullableNode(null, false));

	}

	isWaterBased() {
		return this.stats.waterBased.traitActive.get();
	}

	isFlying() {
		return this.stats.flying.traitActive.get();
	}
}
