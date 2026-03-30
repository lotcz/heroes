import {BiotopeResource} from "../BiotopeResource";

export class IceBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Ice');
		this.texture.set('img/texture/snow.jpg');

		//this.addDecoration('Mountain', 'img/decor/mountain.png');
	}

}
