import {BiotopeResource} from "../BiotopeResource";

export class LakeBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Lake');
		this.texture.set('img/texture/water.jpg');
		this.illustration.set('img/biotope/lake.jpg');

		this.addDecoration('Wave', 'img/decor/wave-1.png');
	}

}
