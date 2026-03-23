import UnitTypeResource from "../UnitTypeResource";

export default class BlackDragonUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Black Dragon');
		this.image.set('img/monster/dragon-black.png');

		this.baseStats.flying.baseValue.set(1);
	}
}
