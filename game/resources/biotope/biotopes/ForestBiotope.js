import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_LAND, PRECIPITATION_LEVEL_MOIST} from "../../../savegame/tile/TileModel";

export class ForestBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Forest');
		this.texture.set('img/texture/forest.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_LAND);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_MOIST);

		this.addDecoration('Pine Trees', 'img/decor/pine-trees.png');
	}

}
