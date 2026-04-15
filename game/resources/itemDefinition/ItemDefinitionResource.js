import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";
import IntValue from "wgge/core/model/value/IntValue";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";

export const ITEM_TYPE_CLUTTER = 1;
export const ITEM_TYPE_WEAPON = 2;
export const ITEM_TYPE_ARMOR = 3;
export const ITEM_TYPE_FOOD = 4;
export const ITEM_TYPE_DRINK = 5;

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
