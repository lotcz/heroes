import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class GorillaUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Gorilla');
		this.image.set('img/monster/gorilla.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);

		this.addPreferredBiotope(biotopes.jungle);
	}
}
