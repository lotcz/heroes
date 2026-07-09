import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ItemSlotModel from "../../inventory/items/ItemSlotModel";
import {
	ITEM_TYPE_MELEE_WEAPON,
	ITEM_TYPE_RANGED_WEAPON
} from "../../../resources/itemDefinition/ItemDefinitionResource";

const HAND_ALLOWED_TYPES = null;
const HAND_ACTIVE_TYPES = [ITEM_TYPE_MELEE_WEAPON, ITEM_TYPE_RANGED_WEAPON];

export default class UnitInventoryModel extends ModelNodeCollection {

	/**
	 * @type ItemSlotModel
	 */
	leftHand;

	/**
	 * @type ItemSlotModel
	 */
	rightHand;

	constructor() {
		super(() => new ItemSlotModel(), true);

		this.leftHand = this.add(new ItemSlotModel(HAND_ALLOWED_TYPES, HAND_ACTIVE_TYPES));
		this.rightHand = this.add(new ItemSlotModel(HAND_ALLOWED_TYPES, HAND_ACTIVE_TYPES));
	}

}

