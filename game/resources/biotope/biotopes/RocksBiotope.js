import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_HOT,
	HEAT_LEVEL_TEMPERATE,
	HEIGHT_LEVEL_MOUNTAINS,
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_NORMAL
} from "../../../savegame/tile/TileModel";

export class RocksBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Rocks');
		this.texture.set('img/texture/tundra.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_MOUNTAINS, HEIGHT_LEVEL_MOUNTAINS);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_DRY, PRECIPITATION_LEVEL_NORMAL);
		this.limits.heatLimit.set(HEAT_LEVEL_TEMPERATE, HEAT_LEVEL_HOT);

		this.addDecoration('Mountain', 'img/decor/mountain.png');
	}

}
