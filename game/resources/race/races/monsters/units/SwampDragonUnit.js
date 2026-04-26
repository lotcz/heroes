import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class SwampDragonUnit extends UnitTypeResource {

	constructor(itemsDefinitions) {
		super();

		this.name.set('Swamp Dragon');
		this.image.set('img/monster/swamp-dragon.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);
	}
}
