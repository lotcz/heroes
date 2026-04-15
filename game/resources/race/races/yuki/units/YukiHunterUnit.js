import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class YukiHunterUnit extends UnitTypeResource {

	constructor() {
		super();

		this.name.set('Hunter');
		this.image.set('img/character/yuki/yuki-hunter.png');

		this.baseStats.health.baseValue.set(4);
		this.baseStats.ranged.baseValue.set(4);
		this.baseStats.swimming.baseValue.set(1);
	}
}
