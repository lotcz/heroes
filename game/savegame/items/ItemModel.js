import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class ItemModel extends ObjectModel {

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

		this.itemDefinitionId = this.addProperty('itemDefinitionId', new IntValue(itemDefinitionId));
		this.itemDefinition = this.addProperty('itemDefinition', new NullableNode(null, false));

	}

}
