import ObjectModel from "wgge/core/model/ObjectModel";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class ItemSlotModel extends ObjectModel {

	/**
	 * @type NullableNode<ItemModel>
	 */
	item;

	/**
	 * @type array<number> | null
	 */
	allowedTypes;

	/**
	 * @type array<number>
	 */
	activeTypes;

	constructor(allowedTypes = null, activeTypes = []) {
		super();

		this.allowedTypes = allowedTypes;
		this.activeTypes = activeTypes;
		this.item = this.addProperty('item', new NullableNode(null, false));

	}

	isAllowedType(type) {
		if (this.allowedTypes === null) return true;
		return this.allowedTypes.includes(type);
	}

	isActiveType(type) {
		return this.activeTypes.includes(type);
	}

}
