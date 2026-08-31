import {BiotopeResource} from "../BiotopeResource";

export class OceanBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Ocean');
		this.texture.set('img/texture/sea-water.jpg');
		this.illustration.set('img/biotope/ocean.jpg');

		this.addDecoration('Waves', 'img/decor/waves.png');
	}

}
