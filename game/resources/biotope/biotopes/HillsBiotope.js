import {BiotopeResource} from "../BiotopeResource";

export class HillsBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Hills');
		this.texture.set('img/texture/forest.jpg');
		this.illustration.set('img/biotope/hills.jpg');

		this.addDecoration('Hill', 'img/decor/hill.png', true);
		this.addDecoration('Hill', 'img/decor/hill-2.png', true);
	}

}
