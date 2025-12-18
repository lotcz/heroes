import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import IntValue from "wgge/core/model/value/IntValue";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class FactionModel extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	color;

	/**
	 * @type IntValue
	 */
	raceId;

	/**
	 * @type NullableNode<RaceModel>
	 */
	race;

	constructor(id) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.color = this.addProperty('color', new StringValue());
		this.raceId = this.addProperty('raceId', new IntValue());
		this.race = this.addProperty('race', new NullableNode(null, false));

	}

}
