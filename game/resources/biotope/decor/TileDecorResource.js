import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";

export class TileDecorResource extends IdentifiedModelNode {

	constructor(id = 0) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.image = this.addProperty('image', new StringValue());

	}

	getResourcesForPreload() {
		return [this.image.get()];
	}

}
