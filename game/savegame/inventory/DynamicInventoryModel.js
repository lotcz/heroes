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

	getLastItemIndex() {
		for (let i = this.count() - 1; i >= 0; i--) {
			const slot = this.get(i);
			if (slot.item.isSet()) return i;
		}
		return 0;
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

