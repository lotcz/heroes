import {BiotopeResource} from "../BiotopeResource";

export class RocksBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Rocks');
		this.texture.set('img/texture/forest.jpg');

		this.addDecoration('Trees', 'img/decor/dead-trees-2.png');
		this.addDecoration('Mountain', 'img/decor/mountain.png', true);
	}

}
