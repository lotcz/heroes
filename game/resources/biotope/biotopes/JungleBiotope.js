import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_HOT,
	HEIGHT_LEVEL_HILLS,
	HEIGHT_LEVEL_LAND,
	PRECIPITATION_LEVEL_NORMAL,
	PRECIPITATION_LEVEL_WET
} from "../../../savegame/tile/TileModel";

export class JungleBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Jungle');
		this.texture.set('img/texture/swamp.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_LAND, HEIGHT_LEVEL_HILLS);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_NORMAL, PRECIPITATION_LEVEL_WET);
		this.limits.heatLimit.set(HEAT_LEVEL_HOT, HEAT_LEVEL_HOT);

		this.addDecoration('Pine Trees', 'img/decor/pine-trees.png');
	}

}
