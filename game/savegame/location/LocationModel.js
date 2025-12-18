import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import Vector2 from "wgge/core/model/vector/Vector2";
import IntValue from "wgge/core/model/value/IntValue";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class LocationModel extends IdentifiedModelNode {

	/**
	 * @type Vector2
	 */
	position;

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	image;

	/**
	 * @type IntValue
	 */
	factionId;

	/**
	 * @type NullableNode<FactionModel>
	 */
	faction;

	constructor(id) {
		super(id);

		this.position = this.addProperty('position', new Vector2());
		this.name = this.addProperty('name', new StringValue());
		this.image = this.addProperty('image', new StringValue());
		this.factionId = this.addProperty('factionId', new IntValue());

		// resources
		this.faction = this.addProperty('faction', new NullableNode(null, false));
	}

	getResourcesForPreloadInternal() {
		return this.image.isSet() ? [this.image.get()] : [];
	}

}
