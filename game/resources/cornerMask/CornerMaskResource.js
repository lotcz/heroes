import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";

export default class CornerMaskResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	image;

	/**
	 * @type StringValue
	 * corner-a, corner-b, corner-c, corner-d, side-l, side-r, side-t or side-b
	 */
	type;

	constructor(id) {
		super(id);

		this.image = this.addProperty('image', new StringValue());
		this.type = this.addProperty('type', new StringValue());

	}
}
