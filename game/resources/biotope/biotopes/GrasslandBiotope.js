import {BiotopeResource} from "../BiotopeResource";
import {HEAT_LEVEL_TEMPERATE, HEIGHT_LEVEL_LAND, PRECIPITATION_LEVEL_NORMAL} from "../../../savegame/tile/TileModel";

export class GrasslandBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Grassland');
		this.texture.set('img/texture/grass.jpg');

		this.limits.heightLimit.set(HEIGHT_LEVEL_LAND, HEIGHT_LEVEL_LAND);
		this.limits.precipitationLimit.set(PRECIPITATION_LEVEL_NORMAL, PRECIPITATION_LEVEL_NORMAL);
		this.limits.heatLimit.set(HEAT_LEVEL_TEMPERATE, HEAT_LEVEL_TEMPERATE);

		//this.addDecoration('Pine Trees', 'img/decor/pine-trees.png');
	}

}
