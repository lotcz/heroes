import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class KalingaWarriorUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Warrior');
		this.image.set('img/character/kalinga/kalinga-warrior.png');

		this.baseStats.health.baseValue.set(8);
	}
}
