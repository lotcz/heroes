import UnitTypeResource from "../UnitTypeResource";

export default class OrcUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Orc');
		this.image.set('img/monster/orc-2.png');

	}
}
