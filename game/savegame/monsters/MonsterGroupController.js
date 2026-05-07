import ArrayHelper from "wgge/core/helper/ArrayHelper";
import GroupController from "../group/GroupController";

export default class MonsterGroupController extends GroupController {

	/**
	 * @type GroupModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.save = this.game.saveGame.get();
		this.tile = null;

		this.addAutoEvent(
			this.save,
			'end-turn',
			() => this.moveMonster()
		);

	}

	isPreferredBiotope(biotopeId) {
		const unit = this.model.members.first();
		if (!unit) return false;
		const unitType = unit.unitType.get();
		if (!unitType) return false;
		return unitType.prefersBiotope(biotopeId);
	}

	moveMonster() {
		let neighbors = this.save.travel.tiles
			.getGroupMovableNeighbors(this.model.position, this.model)
			.filter((t) => this.isPreferredBiotope(t.biotopeId.get()))
			.filter((t) => t.locationId.isEmpty());
		const tile = ArrayHelper.random(neighbors);
		if (tile) this.moveGroupTo(tile);
	}
}
