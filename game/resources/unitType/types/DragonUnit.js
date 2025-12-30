import UnitTypeResource from "../UnitTypeResource";

export default class DragonUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Dragon');
		this.image.set('img/monster/dragon.png');

		this.baseStats.flying.baseValue.set(1);
	}
}
