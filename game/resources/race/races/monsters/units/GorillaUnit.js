import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class GorillaUnit extends UnitTypeResource {

	constructor(itemsDefinitions) {
		super();

		this.name.set('Gorilla');
		this.image.set('img/monster/gorilla.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);
	}
}
