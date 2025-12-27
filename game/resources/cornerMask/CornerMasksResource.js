import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import CornerMaskResource from "./CornerMaskResource";

export default class CornerMasksResource extends ModelNodeTable {

	constructor() {
		super((id) => new CornerMaskResource(id));
	}

	addMask(image, type) {
		const mask = this.add();
		mask.image.set(image);
		mask.type.set(type);
		return mask;
	}

}
