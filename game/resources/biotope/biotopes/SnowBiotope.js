import {BiotopeResource} from "../BiotopeResource";

export class SnowBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Snow');
		this.texture.set('img/texture/snow.jpg');
		this.illustration.set('img/biotope/snow.jpg');

		this.addDecoration('Trees', 'img/decor/dead-trees-2.png');
	}

}
