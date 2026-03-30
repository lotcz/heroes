import {BiotopeResource} from "../BiotopeResource";

export class RiverBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('River');
		this.texture.set('img/texture/water.jpg');

		this.isWater.set(true);

	}

}
