import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_TEMPERATE,
	HEIGHT_LEVEL_BEACH,
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_NORMAL
} from "../../../savegame/tile/TileModel";

/**
 * Sandy beach found by the ocean in temperate and hot climate
 */
export class BeachBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Beach');
		this.texture.set('img/texture/beach.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_BEACH, HEIGHT_LEVEL_BEACH);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_DRY, PRECIPITATION_LEVEL_NORMAL);
		this.limits.heatLimit.set(HEAT_LEVEL_TEMPERATE, HEAT_LEVEL_TEMPERATE);

	}

}
