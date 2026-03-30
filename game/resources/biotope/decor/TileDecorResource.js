import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import BoolValue from "wgge/core/model/value/BoolValue";

export class TileDecorResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	image;

	/**
	 * @type BoolValue
	 */
	isBlocking;

	constructor(id = 0) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.image = this.addProperty('image', new StringValue());
		this.isBlocking = this.addProperty('isBlocking', new BoolValue(false));

	}

	getResourcesForPreload() {
		return [this.image.get()];
	}

}
