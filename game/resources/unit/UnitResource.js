import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";

export default class UnitResource extends IdentifiedModelNode {

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

		this.name = this.addProperty('name', new StringValue());
		this.image = this.addProperty('image', new StringValue());

	}
}
