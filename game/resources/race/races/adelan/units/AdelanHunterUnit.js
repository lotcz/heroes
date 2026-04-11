import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class AdelanHunterUnit extends UnitTypeResource {

	constructor() {
		super();

		this.name.set('Hunter');
		this.image.set('img/character/adelan/adelan-hunter.png');
		
		this.baseStats.health.baseValue.set(4);
	}
}
