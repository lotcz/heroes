import {BiotopeResource} from "../BiotopeResource";

export class GrasslandBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Grassland');
		this.texture.set('img/texture/grass.jpg');
		this.illustration.set('img/biotope/grassland.jpg');

		//this.addDecoration('Pine Trees', 'img/decor/pine-trees.png');
	}

}
