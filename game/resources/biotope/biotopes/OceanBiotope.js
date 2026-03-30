import {BiotopeResource} from "../BiotopeResource";

export class OceanBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Ocean');
		this.texture.set('img/texture/water.jpg');

	}

}
