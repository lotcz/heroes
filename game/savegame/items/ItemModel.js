import StringValue from "wgge/core/model/value/StringValue";
import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class ItemModel extends ObjectModel {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type IntValue
	 */
	itemDefinitionId;

	/**
	 * @type NullableNode<ItemDefinitionResource>
	 */
	itemDefinition;

	constructor(name, itemDefinitionId) {
		super();

		this.name = this.addProperty('name', new StringValue(name));
		this.itemDefinitionId = this.addProperty('itemDefinitionId', new IntValue(itemDefinitionId));
		this.itemDefinition = this.addProperty('itemDefinition', new NullableNode(null, false));

	}

}
