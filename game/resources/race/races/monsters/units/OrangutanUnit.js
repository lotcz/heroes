import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class OrangutanUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Orangutan');
		this.image.set('img/monster/orangutan.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);
		this.addLoot(itemsDefinitions.meat);

		this.addPreferredBiotope(biotopes.hills);
	}
}
