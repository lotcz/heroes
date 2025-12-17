import StringValue from "wgge/core/model/value/StringValue";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import IntValue from "wgge/core/model/value/IntValue";

export class BiotopeResource extends IdentifiedModelNode {

	constructor(id = 0) {
		super(id);

		this.name = this.addProperty('factionStyle', new StringValue());
		this.texture = this.addProperty('texture', new StringValue());

		this.heightLevel = this.addProperty('heightLevel', new IntValue());
		this.precipitationLevel = this.addProperty('precipitationLevel', new IntValue());
	}

	getResourcesForPreload() {
		return [this.texture.get()];
	}

}
