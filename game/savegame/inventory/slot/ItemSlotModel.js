import ObjectModel from "wgge/core/model/ObjectModel";
import NullableNode from "wgge/core/model/value/NullableNode";
import IntValue from "wgge/core/model/value/IntValue";

export default class ItemSlotModel extends ObjectModel {

	/**
	 * @type NullableNode<ItemModel>
	 */
	item;

	/**
	 * @type IntValue
	 */
	allowedType;

	constructor(allowedType = null, persistent = true) {
		super(persistent);

		this.allowedType = this.addProperty('allowedType', new IntValue(allowedType));
		this.item = this.addProperty('item', new NullableNode(null));
	}

	isAllowedType(type) {
		if (this.allowedType.isEmpty()) return true;
		return this.allowedType.equalsTo(type);
	}

	acceptsItem(item) {
		if (!item) return true;
		if (item.itemDefinition.isEmpty()) {
			console.error('Item defition is empty! Cannot determine is slot accepts the item');
			return false;
		}
		const def = item.itemDefinition.get();
		return this.isAllowedType(def.type.get());
	}

}
