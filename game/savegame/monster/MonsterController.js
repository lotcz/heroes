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
		this.model.unitType.set(
			this.game.resources.unitTypes.getById(this.model.unitTypeId.get())
		);
	}

	deactivateInternal() {
		this.model.unitType.set(null);
	}

	moveMonster() {
		let neighbors = this.save.travel.tiles.getNeighbors(this.model.position);
		const unitTypeBaseStats = this.model.unitType.get().baseStats;
		const isWaterBased = unitTypeBaseStats.waterBased.baseValue.equalsTo(1);
		const isFlying = unitTypeBaseStats.flying.baseValue.equalsTo(1);
		if (isWaterBased) {
			console.log('water');
			neighbors = neighbors.filter(n => n.isWater());
		} else if (!isFlying) {
			neighbors = neighbors.filter(n => n.isLand());
		}
		const tile = ArrayHelper.random(neighbors);
		if (!tile) {
			console.log('nowhere to move');
			return;
		}
		if (this.tile) this.tile.monsterId.set(null);
		this.tile = tile;
		this.model.position.set(this.tile.position);
		this.tile.monsterId.set(this.model.id.get());
	}
}
