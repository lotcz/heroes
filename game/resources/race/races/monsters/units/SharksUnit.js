import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class SharksUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Sharks');
		this.image.set('img/monster/sharks.png');

		this.baseStats.health.baseValue.set(4);

		this.baseStats.swimming.baseValue.set(1);
		this.baseStats.walking.baseValue.set(0);
	}
}
