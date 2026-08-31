import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import {TileDecorResource} from "./decor/TileDecorResource";

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
	 * @type StringValue
	 */
	illustration;

	/**
	 * @type ModelNodeTable
	 */
	decorations;

	constructor(id = 0) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.texture = this.addProperty('texture', new StringValue());
		this.illustration = this.addProperty('illustration', new StringValue());
		this.decorations = this.addProperty('decorations', new ModelNodeTable((id) => new TileDecorResource(id)));
	}

	getResourcesForPreload() {
		return [this.texture.get()];
	}

	addDecoration(name, image, blocking = false) {
		const decor = this.decorations.add();
		decor.name.set(name);
		decor.image.set(image);
		decor.isBlocking.set(blocking);
		return decor;
	}

}
