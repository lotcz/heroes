import ObjectModel from "wgge/core/model/ObjectModel";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class CursorInfoModel extends ObjectModel {

	/**
	 * @type NullableNode<ItemModel>
	 */
	item;

	/**
	 * @type NullableNode<TileModel>
	 */
	tile;

	constructor() {
		super(false);

		this.item = this.addProperty('item', new NullableNode(null, false));
		this.tile = this.addProperty('tile', new NullableNode(null, false));

	}

}

