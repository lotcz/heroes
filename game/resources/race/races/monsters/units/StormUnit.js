import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class StormUnit extends UnitTypeResource {

	constructor() {
		super();

		this.name.set('Storm');
		this.image.set('img/monster/storm.png');

		this.baseStats.health.baseValue.set(999);
		this.baseStats.health.restore();

		this.baseStats.flying.baseValue.set(1);
		this.baseStats.walking.baseValue.set(0);

	}
}
