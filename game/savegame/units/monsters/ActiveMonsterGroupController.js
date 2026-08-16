import ArrayHelper from "wgge/core/helper/ArrayHelper";
import ControllerBase from "wgge/core/controller/ControllerBase";

export default class ActiveMonsterGroupController extends ControllerBase {

	/**
	 * @type GroupModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.save = this.game.saveGame.get();
		this.tile = null;

		this.addAutoEvents(
			this.model,
			['end-my-turn', 'group-perished'],
			() => {
				this.save.triggerEvent('next-monster');
			}
		);

		this.addAutoEvent(
			this.model.stats.movement.currentValue,
			'change',
			() => {
				if (this.model.stats.movement.currentValue.get() > 0) {
					this.actOnMonsterTurn();
				}
			},
			true
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
		if (tile) {
			this.model.triggerEvent('move-to', tile);
		} else {
			console.log(this.model.toString(), 'has nowhere to move - wait turn');
			this.model.stats.movement.consume(1);
		}
	}

	actOnMonsterTurn() {
		const nextToParty = this.save.party.isAlive() && this.save.party.tilePosition.isNeighborPosition(this.model.tilePosition);
		if (nextToParty) {
			console.log(this.model.toString(), 'decided to attack');
			this.model.triggerEvent('attack-group', this.save.party);
		} else {
			console.log(this.model.toString(), 'decided to move');
			this.moveMonster();
		}
	}

	activateInternal() {
		this.model.stats.movement.restore();
		console.log(this.model.toString(), 'activated', this.model.stats.movement.currentValue.get(), 'movement points');
	}

}
