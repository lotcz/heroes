import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class SwampDragonUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Swamp Dragon');
		this.image.set('img/monster/swamp-dragon.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);

		this.addPreferredBiotope(biotopes.swamp);
	}
}
