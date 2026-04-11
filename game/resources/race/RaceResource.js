import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";
import UnitTypesResources from "../unitType/UnitTypesResources";

export default class RaceResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type UnitTypesResources
	 */
	unitTypes;

	/**
	 * @type RaceNamesResources
	 */
	names;

	/**
	 * @type StringValue
	 */
	townImage;

	constructor() {
		super();

		this.name = this.addProperty('name', new StringValue());
		this.unitTypes = this.addProperty('unitTypes', new UnitTypesResources());

		// this.names must be set in inheriting class!

		this.townImage = this.addProperty('townImage', new StringValue());
	}

}
