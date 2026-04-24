import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class BrownBearUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Brown Bear');
		this.image.set('img/monster/brown-bear.png');

		this.baseStats.health.baseValue.set(7);
	}
}
