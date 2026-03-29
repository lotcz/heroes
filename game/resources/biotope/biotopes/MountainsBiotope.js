import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_COLD,
	HEAT_LEVEL_TEMPERATE,
	HEIGHT_LEVEL_MOUNTAINS,
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_WET
} from "../../../savegame/tile/TileModel";

export class MountainsBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Mountains');
		this.texture.set('img/texture/snow.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_MOUNTAINS, HEIGHT_LEVEL_MOUNTAINS);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_DRY, PRECIPITATION_LEVEL_WET);
		this.limits.heatLimit.set(HEAT_LEVEL_COLD, HEAT_LEVEL_TEMPERATE);

		this.addDecoration('Trees', 'img/decor/pine-trees-black-2.png');
		this.addDecoration('Mountain', 'img/decor/mountain.png');
	}

}
