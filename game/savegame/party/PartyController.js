import GroupController from "../group/GroupController";

export default class PartyController extends GroupController {

	/**
	 * @type PartyModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.isMoving = false;

		this.addAutoEvent(
			this.model,
			'interact-with',
			(position) => {
				this.interactWith(position)
			}
		);

		this.addAutoEvent(
			this.model,
			'started-moving',
			() => {
				this.isMoving = true;
			}
		);

		this.addAutoEvent(
			this.model,
			'finished-moving',
			() => {
				this.isMoving = false;
			}
		);

	}

	interactWith(position) {
		if (this.isMoving) return;
		
		if (this.model.stats.movement.currentValue.get() <= 0) {
			this.logAction('Out of movement!');
			return;
		}
		const tile = this.save.travel.tiles.getTile(position);
		if (!tile) return;
		if (this.model.position.equalsTo(position)) {
			this.logAction('This is you!');
			return;
		}
		if (tile.isOccupied()) {
			this.attackAnotherGroup(tile.group.get());
			return;
		}
		if (tile.isBlocked.get()) {
			this.logAction('Blocked!');
			return;
		}
		if (!tile.canGroupMoveHere(this.model)) {
			this.logAction('You cannot move here!');
		}
		this.moveGroupTo(tile);
	}
}
