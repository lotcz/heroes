import GroupModel from "../group/GroupModel";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class PartyModel extends GroupModel {

	/**
	 * @type BoolValue
	 */
	isMoving;

	constructor() {
		super();

		this.isMoving = this.addProperty('isMoving', new BoolValue(false, false));
	}
}

