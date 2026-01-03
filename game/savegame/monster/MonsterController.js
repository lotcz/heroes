import ControllerBase from "wgge/core/controller/ControllerBase";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import AnimationVector2Controller from "wgge/core/controller/AnimationVector2Controller";

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
			'end-turn',
			() => this.moveMonster()
		);

	}

	activateInternal() {
		this.model.unitType.set(
			this.game.resources.unitTypes.getById(this.model.unitTypeId.get())
		);
		this.tile = this.save.travel.tiles.getTile(this.model.position);
	}

	deactivateInternal() {
		this.model.unitType.set(null);
	}

	moveMonster() {
		let neighbors = this.save.travel.tiles.getFreeNeighbors(this.model.position);
		if (this.model.isWaterBased()) {
			neighbors = neighbors.filter(n => n.isWater());
		} else if (!this.model.isFlying()) {
			neighbors = neighbors.filter(n => n.isLand());
		}
		const tile = ArrayHelper.random(neighbors);
		if (!tile) {
			console.log('nowhere to move');
			return;
		}
		this.model.triggerEvent('started-moving', this.model);
		this.addChild(
			new AnimationVector2Controller(
				this.game,
				this.model.position,
				tile.position,
				500
			).onFinished(
				() => {
					if (this.tile) this.tile.monsterId.set(null);
					this.tile = tile;
					this.model.position.set(this.tile.position);
					this.tile.monsterId.set(this.model.id.get());
					this.model.triggerEvent('finished-moving', this.model);
				}
			)
		);

	}
}
