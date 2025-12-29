import ControllerBase from "wgge/core/controller/ControllerBase";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class MonsterController extends ControllerBase {

	/**
	 * @type MonsterModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.save = this.game.saveGame.get();
		this.tile = null;

		this.addAutoEvent(
			this.save.travel,
			'hero-moved',
			() => this.moveMonster()
		);

	}

	activateInternal() {
		if (this.model.unitId.isSet()) {
			const unit = this.game.resources.units.getById(this.model.unitId.get());
			this.model.unit.set(unit);
		}
	}

	deactivateInternal() {
		this.model.unit.set(null);
	}

	moveMonster() {
		console.log('move monster');
		if (this.tile) this.tile.monster.set(null);
		const neighbors = this.save.travel.tiles.getNeighbors(this.model.position);
		const land = neighbors.filter(t => t.isLand());
		this.tile = ArrayHelper.random(land);
		this.model.position.set(this.tile.position);
		this.tile.monster.set(this.model);
	}
}
