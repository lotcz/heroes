import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_HOT,
	HEIGHT_LEVEL_BEACH,
	HEIGHT_LEVEL_LAND,
	PRECIPITATION_LEVEL_DRY
} from "../../../savegame/tile/TileModel";

/**
 * Desert found in dry and hot climates
 */
export class DesertBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Desert');
		this.texture.set('img/texture/desert.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_BEACH, HEIGHT_LEVEL_LAND);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_DRY, PRECIPITATION_LEVEL_DRY);
		this.limits.heatLimit.set(HEAT_LEVEL_HOT, HEAT_LEVEL_HOT);

		this.addDecoration('Dead Trees', 'img/decor/dead-trees.png');
		//this.addDecoration('Dead Trees', 'img/decor/dead-trees-2.png');
	}

}
