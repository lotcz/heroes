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

	getEmptySlot() {
		return this.find((slot) => slot.item.isEmpty());
	}

	getLastItemIndex() {
		for (let i = this.count() - 1; i >= 0; i--) {
			const slot = this.get(i);
			if (slot.item.isSet()) return i;
		}
		return 0;
	}

	groupItemsToStart() {
		console.log('grouping');
		const last = this.itemsCount.get();
		for (let i = 0; i < last; i++) {
			const slot = this.get(i);
			if (slot.item.isEmpty()) {
				for (let i2 = i + 1, max = this.count(); i2 < max; i2++) {
					const slot2 = this.get(i2);
					if (slot2.item.isSet()) {
						slot.item.set(slot2.item.get());
						slot2.item.set(null);
						break;
					}
				}
			}
		}
	}

}

