import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class SwampDragonUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Swamp Dragon');
		this.image.set('img/monster/swamp-dragon.png');

		this.baseStats.health.baseValue.set(7);
	}
}
