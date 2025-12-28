import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_HILLS, PRECIPITATION_LEVEL_NORMAL} from "../../../savegame/tile/TileModel";

export class TundraBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Tundra');
		this.texture.set('img/texture/tundra.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_HILLS);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_NORMAL);

	}

}
