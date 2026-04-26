import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class TrogloShamanUnit extends UnitTypeResource {

	constructor() {
		super();

		this.name.set('Shaman');
		this.image.set('img/character/troglodyte/troglo-shaman.png');

		this.baseStats.health.baseValue.set(3);
		this.baseStats.rafting.baseValue.set(1);
	}
}
