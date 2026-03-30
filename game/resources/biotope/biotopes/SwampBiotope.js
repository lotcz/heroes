import {BiotopeResource} from "../BiotopeResource";

export class SwampBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Swamp');
		this.texture.set('img/texture/swamp.jpg');

		this.addDecoration('Swamp Tree', 'img/decor/swamp-tree.png');
	}

}
