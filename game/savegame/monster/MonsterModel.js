import IntValue from "wgge/core/model/value/IntValue";
import Vector2 from "wgge/core/model/vector/Vector2";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class MonsterModel extends IdentifiedModelNode {

	/**
	 * @type IntValue
	 */
	unitId;

	/**
	 * @type Vector2
	 */
	position;

	/**
	 * @type NullableNode
	 */
	unit;

	constructor() {
		super();

		this.unitId = this.addProperty('unitId', new IntValue());
		this.position = this.addProperty('position', new Vector2());

		// linked resources
		this.unit = this.addProperty('unit', new NullableNode(null, false));
	}

}
