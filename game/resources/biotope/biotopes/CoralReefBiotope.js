import {BiotopeResource} from "../BiotopeResource";

export class CoralReefBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Coral Reef');
		this.texture.set('img/texture/water.jpg');

		this.addDecoration('Waves', 'img/decor/wave-1.png');
	}

}
