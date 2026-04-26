import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class BlackDragonUnit extends UnitTypeResource {

	constructor(itemsDefinitions) {
		super();

		this.name.set('Black Dragon');
		this.image.set('img/monster/black-dragon.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);
	}
}
