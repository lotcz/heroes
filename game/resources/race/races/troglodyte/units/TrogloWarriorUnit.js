import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class TrogloWarriorUnit extends UnitTypeResource {

	constructor() {
		super();

		this.name.set('Troglodyte Warrior');
		this.image.set('img/character/troglodyte/troglo-warrior.png');

		this.baseStats.health.baseValue.set(3);
	}
}
