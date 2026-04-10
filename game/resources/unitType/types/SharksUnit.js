import UnitTypeResource from "../UnitTypeResource";

export default class SharksUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Sharks');
		this.image.set('img/monster/sharks.png');

		this.baseStats.waterBased.baseValue.set(true);
		this.baseStats.health.baseValue.set(4);
	}
}
