import PathFinder from "../../travel/pathfinding/PathFinder";
import GroupBasicController from "../group/GroupBasicController";

export default class PartyController extends GroupBasicController {

	/**
	 * @type PartyModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
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
			this.model.stats.movement.currentValue,
			'change',
			() => {
				if (this.model.members.isEmpty()) {
					this.model.stats.movement.consume();
					return;
				}

				this.continueAlongPath();
			}
		);

		// on start turn - restore movement
		this.addAutoEvent(
			this.model,
			'start-turn',
			() => {
				this.model.stats.movement.restore();
				// consume food & drinks
				this.model.members.forEach(
					(member) => {
						member.stats.hunger.consume(1);
						member.stats.thirst.consume(5);
						//member.stats.health.restore(1);
					}
				);
				//this.continueAlongPath();
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
		if (this.path.length <= 0) return;
		//if (this.model.isMoving.get()) return;
		if (this.model.stats.movement.currentValue.get() <= 0) return;

		const next = this.path.shift();
		if (!next.canGroupMoveHere(this.model)) {
			this.logAction('Interrupted!');
			this.path = [];
			return;
		}
		this.moveGroupTo(next);
	}

	interactWith(position) {
		if (this.model.isMoving.get()) return;

		if (this.model.stats.movement.currentValue.get() <= 0) {
			this.logAction('Out of movement!');
			return;
		}
		const tile = this.save.travel.tiles.getTile(position);
		if (!tile) {
			this.logAction('No tile!');
			return;
		}
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
			this.pathFinder.reset();
			this.path = path;
			this.continueAlongPath();
		} else {
			this.logAction('No path to destination!');
		}
	}
}
