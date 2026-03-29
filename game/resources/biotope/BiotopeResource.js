import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import {TileDecorResource} from "./decor/TileDecorResource";
import BoolValue from "wgge/core/model/value/BoolValue";
import LevelLimits from "../basic/LevelLimits";

export class BiotopeResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type BoolValue
	 */
	isWater;

	/**
	 * @type StringValue
	 */
	texture;

	/**
	 * @type LevelLimits
	 */
	limits;

	/**
	 * @type ModelNodeTable
	 */
	decorations;

	constructor(id = 0) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.isWater = this.addProperty('isWater', new BoolValue(false));
		this.texture = this.addProperty('texture', new StringValue());
		this.limits = this.addProperty('limits', new LevelLimits());
		this.decorations = this.addProperty('decorations', new ModelNodeTable((id) => new TileDecorResource(id)));
	}

	getResourcesForPreload() {
		return [this.texture.get()];
	}

	addDecoration(name, image) {
		const decor = this.decorations.add();
		decor.name.set(name);
		decor.image.set(image);
		return decor;
	}

}
