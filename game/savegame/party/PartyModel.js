import GroupModel from "../group/GroupModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ItemSlotModel from "../items/ItemSlotModel";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class PartyModel extends GroupModel {

	/**
	 * @type ModelNodeCollection
	 */
	inventory;

	/**
	 * @type BoolValue
	 */
	isMoving;

	constructor() {
		super();

		this.inventory = this.addProperty('inventory', new ModelNodeCollection(() => new ItemSlotModel(), true));
		this.isMoving = this.addProperty('isMoving', new BoolValue(false, false));
	}
}

