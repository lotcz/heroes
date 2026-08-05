import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class KrakenUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Kraken');
		this.image.set('img/monster/kraken-2.png');

		this.baseStats.health.baseValue.set(10);
		this.baseStats.meleeAccuracy.baseValue.set(5);
		this.baseStats.meleeDamage.baseValue.set(5);

		this.baseStats.swimming.baseValue.set(1);
		this.baseStats.walking.baseValue.set(0);

		this.addPreferredBiotope(biotopes.ocean);

	}
}
