import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import Vector2 from "wgge/core/model/vector/Vector2";

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

	constructor(id) {
		super(id);

		this.position = this.addProperty('position', new Vector2());
		this.name = this.addProperty('name', new StringValue());
		this.image = this.addProperty('image', new StringValue());

	}

	getResourcesForPreload() {
		return this.image.isSet() ? [this.image.get()] : [];
	}

}
