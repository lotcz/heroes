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

	constructor(slotsPerRow = 4, minRows = 1) {
		super();

		this.slotsPerRow = this.addProperty('slotsPerRow', new IntValue(slotsPerRow));
		this.minRows = this.addProperty('minRows', new IntValue(minRows));

		this.slotsPerRow.addOnChangeListener(() => this.updateMinSlots());
		this.minRows.addOnChangeListener(() => this.updateMinSlots());
		this.itemsCount.addOnChangeListener(() => this.updateMinSlots());

	}

	getEmptySlot() {
		const empty = super.getEmptySlot();
		if (empty) return empty;
		return this.add();
	}

	addItem(item) {
		const slot = this.getEmptySlot();
		slot.item.set(item);
	}

	updateMinSlots() {
		const lastItemIndex = this.getLastItemIndex();
		const itemsCount = Math.max(lastItemIndex + 1, this.itemsCount.get());
		const minTotalSlots = this.minRows.get() * this.slotsPerRow.get();
		const minSlots = Math.max(
			Math.ceil((itemsCount + 1) / this.slotsPerRow.get()) * this.slotsPerRow.get(),
			minTotalSlots
		);
		while (this.count() < minSlots) this.add();
		const maxSlots = Math.max(lastItemIndex, minSlots);
		while (this.count() > maxSlots) this.remove(this.last());
	}

}

