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

	moveMonster() {
		let neighbors = this.save.travel.tiles
			.getGroupMovableNeighbors(this.model.position, this.model)
			.filter((t) => t.locationId.isEmpty());
		const tile = ArrayHelper.random(neighbors);
		if (tile) this.moveGroupTo(tile);
	}
}
