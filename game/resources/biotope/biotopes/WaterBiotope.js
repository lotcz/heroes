import {BiotopeResource} from "../BiotopeResource";
import {HEIGHT_LEVEL_WATER} from "../../../savegame/tile/TileModel";

export class WaterBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Water');
		this.texture.set('img/texture/water.jpg');
		this.heightLevel.set(HEIGHT_LEVEL_WATER);

	}

}
