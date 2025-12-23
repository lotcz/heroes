import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import {TileDecorResource} from "./decor/TileDecorResource";
import IntValue from "wgge/core/model/value/IntValue";

export class BiotopeResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	texture;

	/**
	 * @type IntValue
	 */
	heightLevel;

	/**
	 * @type IntValue
	 */
	precipitationLevel;

	/**
	 * @type ModelNodeTable
	 */
	decorations;

	constructor(id = 0) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.texture = this.addProperty('texture', new StringValue());

		this.heightLevel = this.addProperty('heightLevel', new IntValue());
		this.precipitationLevel = this.addProperty('precipitationLevel', new IntValue());

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
