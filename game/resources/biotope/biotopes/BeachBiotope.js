import {BiotopeResource} from "../BiotopeResource";

/**
 * Sandy beach found by the ocean in temperate and hot climate
 */
export class BeachBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Beach');
		this.texture.set('img/texture/beach.jpg');

	}

}
