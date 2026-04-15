import GroupController from "../group/GroupController";
import PathFinder from "../travel/pathfinding/PathFinder";

export default class PartyController extends GroupController {

	/**
	 * @type PartyModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.isMoving = false;
		this.pathFinder = new PathFinder(this.model, this.save.travel.tiles);
		this.path = [];

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
				this.pathFinder.reset();
				this.isMoving = true;
			}
		);

		this.addAutoEvent(
			this.model,
			'finished-moving',
			() => {
				this.isMoving = false;
				this.continueAlongPath();
			}
		);

		// on start turn - restore movement
		this.addAutoEvent(
			this.model,
			'start-turn',
			() => {
				this.model.stats.movement.restore();
				if (!this.isMoving) this.continueAlongPath();
			}
		);

		this.addAutoEvent(
			this.model.members,
			'change',
			() => {
				this.pathFinder.reset();
			}
		);

	}

	continueAlongPath() {
		if (this.path.length > 0 && this.model.stats.movement.currentValue.get() > 0) {
			const next = this.path.shift();
			if (!next.canGroupMoveHere(this.model)) {
				this.logAction('Interrupted!');
				this.path = [];
				return;
			}
			this.moveGroupTo(next);
		}
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
			return;
		}
		const path = this.pathFinder.findPath(this.save.travel.visitingTile.get(), tile);
		if (path.length > 0) {
			this.path = path;
			this.continueAlongPath();
		}
	}
}
