import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class CrocodilleUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Crocodille');
		this.image.set('img/monster/crocodille.png');

		this.baseStats.health.baseValue.set(10);
		this.baseStats.meleeAccuracy.baseValue.set(7);
		this.baseStats.meleeDamage.baseValue.set(15);

		this.baseStats.swimming.baseValue.set(1);

		this.addLoot(itemsDefinitions.bones);
		this.addLoot(itemsDefinitions.meat);

		this.addPreferredBiotope(biotopes.ocean);
		this.addPreferredBiotope(biotopes.beach);
	}
}
