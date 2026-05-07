import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class BlackDragonUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Black Dragon');
		this.image.set('img/monster/black-dragon.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);

		this.addPreferredBiotope(biotopes.grassland);
	}
}
