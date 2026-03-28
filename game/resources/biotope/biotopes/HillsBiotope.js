import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_HILLS, PRECIPITATION_LEVEL_NORMAL} from "../../../savegame/tile/TileModel";

export class HillsBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Hills');
		this.texture.set('img/texture/grass.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_HILLS);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_NORMAL);

		this.addDecoration('Pine Trees', 'img/decor/pine-trees-black.png');
	}

}
