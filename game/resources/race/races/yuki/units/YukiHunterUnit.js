import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class YukiHunterUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Hunter');
		this.image.set('img/character/yuki/yuki-hunter.png');

		this.baseStats.health.baseValue.set(4);
		this.baseStats.ranged.baseValue.set(4);
		this.baseStats.rafting.baseValue.set(1);

		this.addLoot(itemDefinitions.handAxe);
		this.addLoot(itemDefinitions.bones);

		this.addPreferredBiotope(biotopes.snow);
		this.addPreferredBiotope(biotopes.peaks);
	}
}
