import AnimationVector2Controller from "wgge/core/controller/AnimationVector2Controller";
import ItemModel from "../inventory/items/ItemModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import CollectionController from "wgge/core/controller/CollectionController";
import UnitController from "./unit/UnitController";
import ControllerBase from "wgge/core/controller/ControllerBase";

export default class GroupController extends ControllerBase {

	/**
	 * @type GroupModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.save = this.game.saveGame.get();
		this.tile = null;

		this.addChild(
			new CollectionController(game, this.model.members, (u) => new UnitController(game, u))
		);

		this.addAutoEvent(
			this.model.position,
			'change',
			() => {
				if (this.tile) {
					this.tile.group.set(null);
				}
				this.tile = this.save.travel.tiles.getTile(this.model.position);
				if (this.tile) {
					this.tile.group.set(this.model);
				}
			},
			true
		);

		this.addAutoEvent(
			this.model,
			'unit-died',
			(unit) => {
				this.logAction(`${unit.name.get()} of ${unit.faction.get().name.get()} died`)
			}
		);

		this.addAutoEvent(
			this.model,
			'drop-item',
			(item) => {
				this.logAction(`Dropped item`);
				if (this.tile) {
					this.tile.items.addItem(new ItemModel(item.itemDefinitionId.get()));
				}
			}
		);

		this.addAutoEvent(
			this.model,
			'group-perished',
			() => {
				if (this.tile) {
					this.tile.group.set(null);
					this.tile = null;
				}
				this.model.removeMyself();
			}
		);

	}

	logAction(action) {
		this.save.logAction(action);
	}

	/**
	 * This assumes that it was already checked whether group can move to the tile
	 */
	moveGroupTo(tile) {
		this.model.renderingOffset.set(this.model.position.sub(tile.position));
		this.model.position.set(tile.position);

		this.model.triggerEvent('started-moving', this.model);
		this.model.stats.movement.consume(1);

		this.addChild(
			new AnimationVector2Controller(
				this.game,
				this.model.renderingOffset,
				new Vector2(0, 0),
				200
			).onFinished(
				() => {
					this.model.triggerEvent('finished-moving', this.model);
				}
			)
		);

	}

	attackWithMelee(unit, victim) {
		this.logAction(`${unit.name.get()} attacking ${victim.name.get()} with melee`);
		victim.triggerEvent('attacked', unit.stats.meleeWeapons.effectiveValue.get());
	}

	attackWithRanged(unit, victim) {
		this.logAction(`${unit.name.get()} attacking ${victim.name.get()} with ranged attack`);
		// todo: play projectile animation
		victim.triggerEvent('attacked', unit.stats.rangedWeapons.effectiveValue.get());
	}

	/**
	 * This assumes that it was already checked whether group can attack this group.
	 * However, if group is too far even for ranged units, it won't be damaged.
	 */
	attackAnotherGroup(group) {
		if (group.members.isEmpty()) {
			console.log('Attacked empty group');
			return;
		}

		// todo: play attack animation, disable attack if nobody can attack

		const isNeighborTile = this.model.position.isNeighborPosition(group.position);

		this.model.members.forEach(
			(unit) => {
				const victim = group.members.random();
				if (!victim) return;
				if (unit.stats.rangedWeapons.effectiveValue.get() > unit.stats.meleeWeapons.effectiveValue.get() || !isNeighborTile) {
					this.attackWithRanged(unit, victim);
				} else {
					this.attackWithMelee(unit, victim);
				}
			}
		);

		this.model.stats.movement.consume(1);
	}

	updateGroupStats() {
		this.model.stats.rafting.baseValue.set(this.model.members.reduce((count, member) => count + member.stats.rafting.traitActive.get() ? 1 : 0, 0));
	}

	activateInternal() {
		this.updateGroupStats();
	}

	updateInternal(delta) {
		if (this.model.members.isDirty) {
			this.updateGroupStats();
		}
	}

}
