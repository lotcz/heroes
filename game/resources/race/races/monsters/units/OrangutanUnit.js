import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class OrangutanUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Orangutan');
		this.image.set('img/monster/orangutan.png');

		this.baseStats.health.baseValue.set(7);
	}
}
