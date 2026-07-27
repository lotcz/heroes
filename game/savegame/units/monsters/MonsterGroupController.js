import ArrayHelper from "wgge/core/helper/ArrayHelper";
import GroupController from "../group/GroupController";
import NumberHelper from "wgge/core/helper/NumberHelper";

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
			() => this.actOnMonsterTurn()
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
		const neighbors = this.save.travel.tiles
			.getGroupMovableNeighbors(this.model.position, this.model)
			.filter((t) => this.isPreferredBiotope(t.biotopeId.get()))
			.filter((t) => t.locationId.isEmpty());
		const tile = ArrayHelper.random(neighbors);
		if (tile) this.moveGroupTo(tile);
	}

	actOnMonsterTurn() {
		const nextToParty = this.save.travel.partyPosition.isNeighborPosition(this.model.position);
		if (nextToParty) {
			this.attackAnotherGroup(this.save.party);
		} else if (NumberHelper.randomPercent(50)) {
			this.moveMonster();
		}
	}
}
