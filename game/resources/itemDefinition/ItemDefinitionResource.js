import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";
import IntValue from "wgge/core/model/value/IntValue";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";

export const ITEM_TYPE_CLUTTER = 1;
export const ITEM_TYPE_CONSUMABLE = 2;
export const ITEM_TYPE_MELEE_WEAPON = 3;
export const ITEM_TYPE_RANGED_WEAPON = 4;
export const ITEM_TYPE_HEAD = 5;
export const ITEM_TYPE_BODY = 6;
export const ITEM_TYPE_LEGS = 7;
export const ITEM_TYPE_SHOES = 8;
export const ITEM_TYPE_TALISMAN = 9;


export default class ItemDefinitionResource extends IdentifiedModelNode {

	/**
	 * @type IntValue
	 */
	type;

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	image;

	/**
	 * @type ModelNodeCollection
	 */
	effects;

	constructor(id) {
		super(id);

		this.type = this.addProperty('type', new IntValue());
		this.name = this.addProperty('name', new StringValue());
		this.image = this.addProperty('image', new StringValue());
		this.effects = this.addProperty('effects', new ModelNodeCollection());
	}

	getResourcesForPreloadInternal() {
		return [this.image.get()];
	}

}
