import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";
import UnitTypesResources from "../unitType/UnitTypesResources";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import IntValue from "wgge/core/model/value/IntValue";

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
		this.preferredBiotopes = this.addProperty('preferredBiotopes', new ModelNodeCollection(() => new IntValue(), true));

	}

	echoNamesPotentials() {
		this.names.echoPotentials(this.name.get());
	}

	addPreferredBiotope(biotope) {
		this.preferredBiotopes.add(biotope.id);
	}

	prefersBiotope(biotopeId) {
		return this.preferredBiotopes.isEmpty() || this.preferredBiotopes.exists((b) => b.equalsTo(biotopeId));
	}

}
