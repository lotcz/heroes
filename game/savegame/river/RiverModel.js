import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";

export default class RiverModel extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	constructor(id) {
		super(id);

		this.name = this.addProperty('name', new StringValue());

	}

}
