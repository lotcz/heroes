import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class GorillaUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Gorilla');
		this.image.set('img/monster/gorilla.png');

		this.baseStats.health.baseValue.set(10);
		this.baseStats.meleeAccuracy.baseValue.set(3);
		this.baseStats.meleeDamage.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);
		this.addLoot(itemsDefinitions.meat);

		this.addPreferredBiotope(biotopes.jungle);
	}
}
