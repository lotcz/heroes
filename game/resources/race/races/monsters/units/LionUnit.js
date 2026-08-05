import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class LionUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Lion');
		this.image.set('img/monster/lion.png');

		this.baseStats.health.baseValue.set(10);
		this.baseStats.meleeAccuracy.baseValue.set(5);
		this.baseStats.meleeDamage.baseValue.set(10);

		this.addLoot(itemDefinitions.bones);
		this.addLoot(itemDefinitions.meat);

		this.addPreferredBiotope(biotopes.desert);
	}
}
