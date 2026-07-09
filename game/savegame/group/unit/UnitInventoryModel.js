import ItemSlotModel from "../../inventory/items/ItemSlotModel";
import {
	ITEM_TYPE_MELEE_WEAPON,
	ITEM_TYPE_RANGED_WEAPON,
	ITEM_TYPE_TALISMAN
} from "../../../resources/itemDefinition/ItemDefinitionResource";
import DynamicInventoryModel from "../../inventory/DynamicInventoryModel";
import ObjectModel from "wgge/core/model/ObjectModel";

export default class UnitInventoryModel extends ObjectModel {

	/**
	 * @type DynamicInventoryModel
	 */
	items;

	/**
	 * @type ItemSlotModel
	 */
	leftHand;

	/**
	 * @type ItemSlotModel
	 */
	rightHand;

	/**
	 * @type ItemSlotModel
	 */
	talisman;

	constructor() {
		super();

		this.items = this.addProperty('items', new DynamicInventoryModel(4, 4));

		this.leftHand = this.addProperty('leftHand', new ItemSlotModel(null, []));
		this.rightHand = this.addProperty('rightHand', new ItemSlotModel(null, [ITEM_TYPE_MELEE_WEAPON, ITEM_TYPE_RANGED_WEAPON]));
		this.talisman = this.addProperty('talisman', new ItemSlotModel([ITEM_TYPE_TALISMAN], [ITEM_TYPE_TALISMAN]));
	}

}

