import {BiotopeResource} from "../BiotopeResource";

export class LakeBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Lake');
		this.texture.set('img/texture/water.jpg');

		this.addDecoration('Waves', 'img/decor/waves.png');
	}

}
