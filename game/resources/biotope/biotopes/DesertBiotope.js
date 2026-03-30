import {BiotopeResource} from "../BiotopeResource";

/**
 * Desert found in dry and hot climates
 */
export class DesertBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Desert');
		this.texture.set('img/texture/desert.jpg');

		this.addDecoration('Dead Trees', 'img/decor/dead-trees.png');
		//this.addDecoration('Dead Trees', 'img/decor/dead-trees-2.png');
	}

}
