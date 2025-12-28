import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import CornerMaskResource from "./CornerMaskResource";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class CornerMasksResource extends ModelNodeTable {

	constructor() {
		super((id) => new CornerMaskResource(id));

		this.addMask('img/mask/corner.png', 'corner');
		this.addMask('img/mask/side-v.png', 'side-v');
		this.addMask('img/mask/side-h.png', 'side-h');
	}

	addMask(image, type) {
		const mask = this.add();
		mask.image.set(image);
		mask.type.set(type);
		return mask;
	}

	getRandomMask(type) {
		const byType = this.filter((m) => m.type.equalsTo(type));
		return ArrayHelper.random(byType);
	}

}
