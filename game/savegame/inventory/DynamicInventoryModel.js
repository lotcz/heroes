import IntValue from "wgge/core/model/value/IntValue";
import InventoryModel from "./InventoryModel";

export default class DynamicInventoryModel extends InventoryModel {

	/**
	 * @type IntValue
	 */
	slotsPerRow;

	/**
	 * @type IntValue
	 */
	minRows;

	constructor() {
		super();

		this.slotsPerRow = this.addProperty('slotsPerRow', new IntValue(4));
		this.minRows = this.addProperty('minRows', new IntValue(1));

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

	updateMinSlots() {
		const minTotalSlots = this.minRows.get() * this.slotsPerRow.get();
		const minSlots = (this.itemsCount.get() >= minTotalSlots)
			? Math.ceil((this.itemsCount.get() + 1) / this.slotsPerRow.get()) * this.slotsPerRow.get()
			: minTotalSlots;
		while (this.count() < minSlots) this.add();
	}

}

