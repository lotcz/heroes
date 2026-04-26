import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class SlothUnit extends UnitTypeResource {

	constructor(itemsDefinitions) {
		super();

		this.name.set('Sloth');
		this.image.set('img/monster/sloth.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);
	}
}
