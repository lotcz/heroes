import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class CrocodilleUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Crocodille');
		this.image.set('img/monster/crocodille.png');

		this.baseStats.health.baseValue.set(5);

		this.baseStats.swimming.baseValue.set(1);

		this.addLoot(itemsDefinitions.bones);

		this.addPreferredBiotope(biotopes.ocean);
		this.addPreferredBiotope(biotopes.beach);
	}
}
