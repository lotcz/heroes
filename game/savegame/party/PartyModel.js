import GroupModel from "../group/GroupModel";
import BoolValue from "wgge/core/model/value/BoolValue";
import DynamicInventoryModel from "../inventory/DynamicInventoryModel";

export default class PartyModel extends GroupModel {

	/**
	 * @type DynamicInventoryModel
	 */
	inventory;

	/**
	 * @type BoolValue
	 */
	isMoving;

	constructor() {
		super();

		this.inventory = this.addProperty('inventory', new DynamicInventoryModel());
		this.isMoving = this.addProperty('isMoving', new BoolValue(false, false));
	}
}

