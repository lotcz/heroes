import {BiotopeResource} from "../BiotopeResource";

export class PeaksBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Peaks');
		this.texture.set('img/texture/snow.jpg');
		this.illustration.set('img/biotope/peaks.jpg');

		this.addDecoration('Trees', 'img/decor/dead-trees-2.png');
		this.addDecoration('Mountain', 'img/decor/mountain.png', true);
	}

}
