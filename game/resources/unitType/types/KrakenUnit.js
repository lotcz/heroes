import UnitTypeResource from "../UnitTypeResource";

export default class KrakenUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Kraken');
		this.image.set('img/monster/kraken.png');

		this.baseStats.waterBased.baseValue.set(1);
	}
}
