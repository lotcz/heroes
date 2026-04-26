import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ItemSlotModel from "../items/ItemSlotModel";

export default class PartyInventoryModel extends ModelNodeCollection {

	constructor() {
		super(() => new ItemSlotModel(), true);

	}

	getEmptySlot() {
		const empty = this.find((slot) => slot.isEmpty());
		if (empty) return empty;
		return this.add();
	}

}

