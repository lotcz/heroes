import UnitTypeResource from "../UnitTypeResource";

export default class LionUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Lion');
		this.image.set('img/monster/lion.png');

		this.baseStats.health.baseValue.set(3);
	}
}
