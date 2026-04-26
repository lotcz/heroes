import ObjectModel from "wgge/core/model/ObjectModel";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class ItemSlotModel extends ObjectModel {

	/**
	 * @type NullableNode<ItemModel>
	 */
	item;

	constructor() {
		super();

		this.item = this.addProperty('item', new NullableNode(null, false));

	}

}
