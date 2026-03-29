import {BiotopeResource} from "../BiotopeResource";
import {HEAT_LEVEL_TEMPERATE, HEIGHT_LEVEL_HILLS, PRECIPITATION_LEVEL_NORMAL} from "../../../savegame/tile/TileModel";

export class HillsBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Hills');
		this.texture.set('img/texture/forest.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_HILLS, HEIGHT_LEVEL_HILLS);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_NORMAL, PRECIPITATION_LEVEL_NORMAL);
		this.limits.heatLimit.set(HEAT_LEVEL_TEMPERATE, HEAT_LEVEL_TEMPERATE);

		this.addDecoration('Pine Trees', 'img/decor/pine-trees-black.png');
	}

}
