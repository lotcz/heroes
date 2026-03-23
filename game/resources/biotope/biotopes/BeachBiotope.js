import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_BEACH, PRECIPITATION_LEVEL_NORMAL} from "../../../savegame/tile/TileModel";

/**
 * Sandy beach found by the ocean in temperate and hot climate
 */
export class BeachBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Beach');
		this.texture.set('img/texture/beach.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_BEACH);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_NORMAL);

	}

}
