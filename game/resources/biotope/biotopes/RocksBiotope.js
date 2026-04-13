import {BiotopeResource} from "../BiotopeResource";

export class RocksBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Rocks');
		this.texture.set('img/texture/rock.jpg');

		this.addDecoration('Mountain', 'img/decor/mountain.png');
	}

}
