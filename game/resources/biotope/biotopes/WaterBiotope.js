import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_COLD,
	HEAT_LEVEL_HOT,
	HEIGHT_LEVEL_WATER,
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_WET
} from "../../../savegame/tile/TileModel";

export class WaterBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Water');
		this.texture.set('img/texture/water.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_WATER, HEIGHT_LEVEL_WATER);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_DRY, PRECIPITATION_LEVEL_WET);
		this.limits.heatLimit.set(HEAT_LEVEL_COLD, HEAT_LEVEL_HOT);

		this.isWater.set(true);

	}

}
