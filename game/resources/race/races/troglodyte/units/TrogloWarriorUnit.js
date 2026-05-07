import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class TrogloWarriorUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Warrior');
		this.image.set('img/character/troglodyte/troglo-warrior.png');

		this.baseStats.health.baseValue.set(10);

		this.addLoot(itemDefinitions.stoneAxe);

		this.addPreferredBiotope(biotopes.tundra);
	}
}
