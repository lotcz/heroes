import UnitTypeResource from "../UnitTypeResource";

export default class RogueUnit extends UnitTypeResource {

	constructor(id) {
		super(id);

		this.name.set('Rogue');
		this.image.set('img/character/rogue-color.png');

	}
}
