import {BiotopeResource} from "../BiotopeResource";

export class JungleBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Jungle');
		this.texture.set('img/texture/grass.jpg');
		this.illustration.set('img/biotope/jungle.jpg');

		this.addDecoration('Jungle', 'img/decor/jungle-1.png', true);
		this.addDecoration('Jungle', 'img/decor/jungle-2.png');
	}

}
