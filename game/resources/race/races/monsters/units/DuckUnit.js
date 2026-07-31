import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class DuckUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Duck');
		this.image.set('img/monster/duck.png');

		this.baseStats.health.baseValue.set(1);

		this.baseStats.swimming.baseValue.set(1);
		this.baseStats.flying.baseValue.set(1);

		this.addLoot(itemsDefinitions.bones);
		this.addLoot(itemsDefinitions.meat);
		
		this.addPreferredBiotope(biotopes.river);
		this.addPreferredBiotope(biotopes.lake);
		this.addPreferredBiotope(biotopes.beach);
	}
}
