import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_MOUNTAINS, PRECIPITATION_LEVEL_NORMAL} from "../../../savegame/tile/TileModel";

export class MountainsBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Mountains');
		this.texture.set('img/texture/snow.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_MOUNTAINS);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_NORMAL);

		this.addDecoration('Mountain', 'img/decor/mountain.png');
	}

}
