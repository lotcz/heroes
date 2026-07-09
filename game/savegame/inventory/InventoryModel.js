import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ItemSlotModel from "./items/ItemSlotModel";
import IntValue from "wgge/core/model/value/IntValue";

export default class InventoryModel extends ModelNodeCollection {

	/**
	 * @type IntValue
	 */
	itemsCount;

	constructor() {
		super(() => new ItemSlotModel(), true);

		this.itemsCount = this.addProperty('itemsCount', new IntValue(0, false));

		this.slotChangeHandler = () => this.updateItemsCount();
		this.addOnAddListener((slot) => slot.item.addEventListener('change', this.slotChangeHandler));
		this.addOnRemoveListener((slot) => slot.item.removeEventListener('change', this.slotChangeHandler));
		this.addOnChangeListener(this.slotChangeHandler);
		this.updateItemsCount();
	}

	updateItemsCount() {
		this.itemsCount.set(this.filter((s) => s.item.isSet()).length);
	}

}

