import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_HOT,
	HEAT_LEVEL_TEMPERATE,
	HEIGHT_LEVEL_BEACH,
	HEIGHT_LEVEL_LAND,
	PRECIPITATION_LEVEL_WET
} from "../../../savegame/tile/TileModel";

export class SwampBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Swamp');
		this.texture.set('img/texture/swamp.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_BEACH, HEIGHT_LEVEL_LAND);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_WET, PRECIPITATION_LEVEL_WET);
		this.limits.heatLimit.set(HEAT_LEVEL_TEMPERATE, HEAT_LEVEL_HOT);

		this.addDecoration('Swamp Tree', 'img/decor/swamp-tree.png');
	}

}
