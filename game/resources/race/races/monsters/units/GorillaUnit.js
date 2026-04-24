import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class GorillaUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Gorilla');
		this.image.set('img/monster/gorilla.png');

		this.baseStats.health.baseValue.set(7);
	}
}
