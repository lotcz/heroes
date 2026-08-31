import {BiotopeResource} from "../BiotopeResource";

export class TundraBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Tundra');
		this.texture.set('img/texture/tundra.jpg');
		this.illustration.set('img/biotope/tundra.jpg');

		this.addDecoration('Trees', 'img/decor/dead-trees.png');
	}

}
