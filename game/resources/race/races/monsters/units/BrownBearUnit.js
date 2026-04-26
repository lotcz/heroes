import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class BrownBearUnit extends UnitTypeResource {

	constructor(itemsDefinitions) {
		super();

		this.name.set('Brown Bear');
		this.image.set('img/monster/brown-bear.png');

		this.baseStats.health.baseValue.set(7);

		this.addLoot(itemsDefinitions.bones);
	}
}
