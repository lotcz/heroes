import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class KrakenUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Kraken');
		this.image.set('img/monster/kraken.png');

		this.baseStats.waterBased.baseValue.set(1);
		this.baseStats.health.baseValue.set(5);
	}
}
