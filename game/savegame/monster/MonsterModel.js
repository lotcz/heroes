import IntValue from "wgge/core/model/value/IntValue";
import Vector2 from "wgge/core/model/vector/Vector2";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class MonsterModel extends IdentifiedModelNode {

	/**
	 * @type Vector2
	 */
	position;

	/**
	 * @type IntValue
	 */
	unitTypeId;

	/**
	 * @type NullableNode<UnitTypeResource>
	 */
	unitType;

	constructor() {
		super();

		this.position = this.addProperty('position', new Vector2());

		this.unitTypeId = this.addProperty('unitTypeId', new IntValue());

		// linked resources
		this.unitType = this.addProperty('unitType', new NullableNode(null, false));
	}

}
