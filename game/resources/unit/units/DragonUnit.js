import UnitResource from "../UnitResource";

export default class DragonUnit extends UnitResource {

	constructor(id) {
		super(id);

		this.name.set('Dragon');
		this.image.set('img/character/dragon.png');

	}
}
