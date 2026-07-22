import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class AdelanHunterUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Hunter');
		this.image.set('img/character/adelan/adelan-hunter-2.png');

		this.baseStats.health.baseValue.set(4);
		this.baseStats.rangedWeapons.baseValue.set(4);

		this.addLoot(itemDefinitions.handAxe);
		this.addLoot(itemDefinitions.bones);

		this.addPreferredBiotope(biotopes.grassland);
	}
}
