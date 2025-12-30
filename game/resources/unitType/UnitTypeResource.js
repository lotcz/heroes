import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";
import UnitStatsModel from "../stats/UnitStatsModel";

export default class UnitTypeResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	image;

	/**
	 * @type UnitStatsModel
	 */
	baseStats;

	constructor(id) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.image = this.addProperty('image', new StringValue());
		this.baseStats = this.addProperty('baseStats', new UnitStatsModel());

	}
}
