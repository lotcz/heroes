import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_BEACH, PRECIPITATION_LEVEL_MOIST} from "../../../savegame/tile/TileModel";

export class ShoreBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Shore');
		this.texture.set('img/texture/shore.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_BEACH);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_MOIST);

	}

}
