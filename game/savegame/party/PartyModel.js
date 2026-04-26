import GroupModel from "../group/GroupModel";
import BoolValue from "wgge/core/model/value/BoolValue";
import PartyInventoryModel from "./PartyInventoryModel";

export default class PartyModel extends GroupModel {

	/**
	 * @type PartyInventoryModel
	 */
	inventory;

	/**
	 * @type BoolValue
	 */
	isMoving;

	constructor() {
		super();

		this.inventory = this.addProperty('inventory', new PartyInventoryModel());
		this.isMoving = this.addProperty('isMoving', new BoolValue(false, false));
	}
}

