import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_LAND, PRECIPITATION_LEVEL_DRY} from "../../../savegame/tile/TileModel";

export class DesertBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Desert');
		this.texture.set('img/texture/desert.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_LAND);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_DRY);

		this.addDecoration('Dead Trees', 'img/decor/dead-trees.png');
		this.addDecoration('Dead Trees', 'img/decor/dead-trees-2.png');
	}

}
