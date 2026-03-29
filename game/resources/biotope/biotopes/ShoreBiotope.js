import {BiotopeResource} from "../BiotopeResource";
import {HEAT_LEVEL_TEMPERATE, HEIGHT_LEVEL_BEACH, PRECIPITATION_LEVEL_MOIST} from "../../../savegame/tile/TileModel";

export class ShoreBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Shore');
		this.texture.set('img/texture/shore.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_BEACH, HEIGHT_LEVEL_BEACH);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_MOIST, PRECIPITATION_LEVEL_MOIST);
		this.limits.heatLimit.set(HEAT_LEVEL_TEMPERATE, HEAT_LEVEL_TEMPERATE);

	}

}
