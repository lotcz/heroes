import ArrayHelper from "wgge/core/helper/ArrayHelper";
import NumberHelper from "wgge/core/helper/NumberHelper";
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

		this.addAutoEvent(
			this.model,
			'end-my-turn',
			() => {
				console.log('monster finished');
				this.save.triggerEvent('next-monster');
			}
		);

		this.addAutoEvent(
			this.model,
			'group-perished',
			() => {
				console.log('active monster perished');
			}
		);

		this.addAutoEvent(
			this.model.stats.movement.currentValue,
			'change',
			() => {
				if (this.model.stats.movement.currentValue.get() > 0) {
					console.log('has movement, acting');
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
			// nowhere to move - wait turn
			this.model.stats.movement.consume(1);
		}
	}

	actOnMonsterTurn() {
		const nextToParty = this.save.travel.partyPosition.isNeighborPosition(this.model.position);
		if (nextToParty) {
			console.log('monster attacking', this.model.toString());
			this.model.triggerEvent('attack-group', this.save.party);
		} else if (NumberHelper.randomPercent(50)) {
			console.log('monster moving', this.model.toString());
			this.moveMonster();
		} else {
			// wait turn
			console.log('monster waiting', this.model.toString());
			this.model.stats.movement.consume(1);
		}
	}

}
