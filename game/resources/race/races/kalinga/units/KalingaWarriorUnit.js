import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class KalingaWarriorUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Warrior');
		this.image.set('img/character/kalinga/kalinga-warrior.png');

		this.baseStats.health.baseValue.set(8);

		this.addLoot(itemDefinitions.handAxe);

		this.addPreferredBiotope(biotopes.jungle);
	}
}
