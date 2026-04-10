import UnitTypeResource from "../UnitTypeResource";

export default class DarkKnightUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Dark Knight');
		this.image.set('img/monster/orc.png');

		this.baseStats.health.baseValue.set(2);
	}
}
