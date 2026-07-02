import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ItemSlotModel from "../items/ItemSlotModel";
import IntValue from "wgge/core/model/value/IntValue";

export default class PartyInventoryModel extends ModelNodeCollection {

	/**
	 * @type IntValue
	 */
	slotsPerRow;

	/**
	 * @type IntValue
	 */
	minRows;

	/**
	 * @type IntValue
	 */
	itemsCount;

	constructor() {
		super(() => new ItemSlotModel(), true);

		this.slotsPerRow = this.addProperty('slotsPerRow', new IntValue(4));
		this.minRows = this.addProperty('minRows', new IntValue(1));

		this.itemsCount = this.addProperty('itemsCount', new IntValue(0, false));
		this.addOnChangeListener(() => this.updateItemsCount());
		this.addOnDirtyListener(() => this.updateItemsCount());

		this.slotsPerRow.addOnChangeListener(() => this.updateMinSlots());
		this.minRows.addOnChangeListener(() => this.updateMinSlots());
		this.itemsCount.addOnChangeListener(() => this.updateMinSlots());

	}

	getEmptySlot() {
		const empty = this.find((slot) => slot.item.isEmpty());
		if (empty) return empty;
		return this.add();
	}

	addItem(item) {
		const slot = this.getEmptySlot();
		slot.item.set(item);
	}

	updateItemsCount() {
		this.itemsCount.set(this.filter((s) => s.item.isSet()).length);
	}

	updateMinSlots() {
		const minTotalSlots = this.minRows.get() * this.slotsPerRow.get();
		const minSlots = (this.itemsCount.get() >= minTotalSlots)
			? Math.ceil((this.itemsCount.get() + 1) / this.slotsPerRow.get()) * this.slotsPerRow.get()
			: minTotalSlots;
		while (this.count() < minSlots) this.add();
	}

}

