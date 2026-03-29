import {BiotopeResource} from "../BiotopeResource";
import {
	HEAT_LEVEL_COLD,
	HEIGHT_LEVEL_MOUNTAINS,
	PRECIPITATION_LEVEL_NORMAL,
	PRECIPITATION_LEVEL_WET
} from "../../../savegame/tile/TileModel";

export class MountainsBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Snow');
		this.texture.set('img/texture/snow.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_MOUNTAINS, HEIGHT_LEVEL_MOUNTAINS);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_NORMAL, PRECIPITATION_LEVEL_WET);
		this.limits.heatLimit.set(HEAT_LEVEL_COLD, HEAT_LEVEL_COLD);


		//this.addDecoration('Mountain', 'img/decor/mountain.png');
	}

}
