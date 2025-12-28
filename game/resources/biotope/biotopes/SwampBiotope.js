import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_BEACH, PRECIPITATION_LEVEL_WET} from "../../../savegame/tile/TileModel";

export class SwampBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Swamp');
		this.texture.set('img/texture/swamp.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_BEACH);
		this.precipitationLevel.set(PRECIPITATION_LEVEL_WET);

	}

}
