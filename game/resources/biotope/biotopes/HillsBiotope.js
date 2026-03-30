import {BiotopeResource} from "../BiotopeResource";

export class HillsBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Hills');
		this.texture.set('img/texture/forest.jpg');

		this.addDecoration('Pine Trees', 'img/decor/pine-trees-black.png');
	}

}
