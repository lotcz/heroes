import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_COLD,
	HEAT_LEVEL_TEMPERATE,
	HEIGHT_LEVEL_HILLS,
	HEIGHT_LEVEL_LAND,
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_NORMAL
} from "../../../savegame/tile/TileModel";

export class TundraBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Tundra');
		this.texture.set('img/texture/tundra.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_LAND, HEIGHT_LEVEL_HILLS);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_DRY, PRECIPITATION_LEVEL_NORMAL);
		this.limits.heatLimit.set(HEAT_LEVEL_COLD, HEAT_LEVEL_TEMPERATE);

		this.addDecoration('Trees', 'img/decor/pine-trees-black-2.png');
	}

}
