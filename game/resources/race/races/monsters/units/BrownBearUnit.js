import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class BrownBearUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Brown Bear');
		this.image.set('img/monster/brown-bear.png');

		this.baseStats.health.baseValue.set(12);
		this.baseStats.meleeAccuracy.baseValue.set(5);
		this.baseStats.meleeDamage.baseValue.set(15);

		this.addLoot(itemsDefinitions.bones);
		this.addLoot(itemsDefinitions.meat);

		this.addPreferredBiotope(biotopes.forest);
	}
}
