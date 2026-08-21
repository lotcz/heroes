import ItemSlotModel from "../../inventory/slot/ItemSlotModel";
import {
	ITEM_TYPE_BODY,
	ITEM_TYPE_CONSUMABLE,
	ITEM_TYPE_HEAD,
	ITEM_TYPE_LEGS,
	ITEM_TYPE_MELEE_WEAPON,
	ITEM_TYPE_RANGED_WEAPON,
	ITEM_TYPE_SHOES,
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
	meleeWeapon;

	/**
	 * @type ItemSlotModel
	 */
	rangedWeapon;

	/**
	 * @type ItemSlotModel
	 */
	head;

	/**
	 * @type ItemSlotModel
	 */
	body;

	/**
	 * @type ItemSlotModel
	 */
	legs;

	/**
	 * @type ItemSlotModel
	 */
	shoes;

	/**
	 * @type ItemSlotModel
	 */
	talisman1;

	/**
	 * @type ItemSlotModel
	 */
	talisman2;

	/**
	 * @type ItemSlotModel
	 */
	talisman3;

	/**
	 * @type ItemSlotModel
	 */
	talisman4;

	/**
	 * @type ItemSlotModel
	 */
	consume;

	constructor() {
		super();

		this.items = this.addProperty('items', new DynamicInventoryModel(4, 5));

		this.meleeWeapon = this.addProperty('leftHand', new ItemSlotModel(ITEM_TYPE_MELEE_WEAPON));
		this.rangedWeapon = this.addProperty('rightHand', new ItemSlotModel(ITEM_TYPE_RANGED_WEAPON));
		this.head = this.addProperty('head', new ItemSlotModel(ITEM_TYPE_HEAD));
		this.body = this.addProperty('body', new ItemSlotModel(ITEM_TYPE_BODY));
		this.legs = this.addProperty('legs', new ItemSlotModel(ITEM_TYPE_LEGS));
		this.shoes = this.addProperty('shoes', new ItemSlotModel(ITEM_TYPE_SHOES));
		this.talisman1 = this.addProperty('talisman1', new ItemSlotModel(ITEM_TYPE_TALISMAN));
		this.talisman2 = this.addProperty('talisman2', new ItemSlotModel(ITEM_TYPE_TALISMAN));
		this.talisman3 = this.addProperty('talisman3', new ItemSlotModel(ITEM_TYPE_TALISMAN));
		this.talisman4 = this.addProperty('talisman4', new ItemSlotModel(ITEM_TYPE_TALISMAN));
		this.consume = this.addProperty('consume', new ItemSlotModel(ITEM_TYPE_CONSUMABLE), false);
	}

}

