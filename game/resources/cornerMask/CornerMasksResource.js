import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import CornerMaskResource from "./CornerMaskResource";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class CornerMasksResource extends ModelNodeTable {

	constructor() {
		super((id) => new CornerMaskResource(id));

		this.addMask('img/mask/corner-a.png', 'corner-a');
		this.addMask('img/mask/corner-a-1.png', 'corner-a');
		this.addMask('img/mask/corner-b.png', 'corner-b');
		this.addMask('img/mask/corner-b-1.png', 'corner-b');
		this.addMask('img/mask/corner-c.png', 'corner-c');
		this.addMask('img/mask/corner-d.png', 'corner-d');
		this.addMask('img/mask/side-l.png', 'side-l');
		this.addMask('img/mask/side-l-1.png', 'side-l');
		this.addMask('img/mask/side-r.png', 'side-r');
		this.addMask('img/mask/side-r-1.png', 'side-r');
		this.addMask('img/mask/side-b.png', 'side-b');
		this.addMask('img/mask/side-t.png', 'side-t');
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
