import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_LAND, PRECIPITATION_LEVEL_NORMAL} from "../../../savegame/tile/TileModel";

export class GrasslandBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Grassland');
		this.texture.set('img/texture/grass.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_LAND);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_NORMAL);

		//this.addDecoration('Pine Trees', 'img/decor/pine-trees.png');
	}

}
