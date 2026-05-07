import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class LionUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Lion');
		this.image.set('img/monster/lion.png');

		this.baseStats.health.baseValue.set(3);

		this.addLoot(itemDefinitions.bones);

		this.addPreferredBiotope(biotopes.desert);
	}
}
