import AnimationVector2Controller from "wgge/core/controller/AnimationVector2Controller";
import ItemModel from "../../inventory/items/ItemModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import CollectionController from "wgge/core/controller/CollectionController";
import UnitController from "../UnitController";
import ControllerBase from "wgge/core/controller/ControllerBase";
import NumberHelper from "wgge/core/helper/NumberHelper";
import SpriteModel, {SPRITE_DART} from "../../travel/main/SpriteModel";

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
			'drop-item',
			(item) => {
				if (!this.tile) {
					console.error('Group controller has no tile to drop the item to!');
					return;
				}
				this.tile.items.addItem(new ItemModel(item.itemDefinitionId.get()));
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

	attack(victim, accuracy, damage) {
		const accuracyRoll = NumberHelper.random(1, 10);
		const attackerAccuracy = accuracy + accuracyRoll;
		const dodgeRoll = NumberHelper.random(1, 10);
		const dodge = victim.stats.evasion.effectiveValue.get() + dodgeRoll;
		if (dodge > attackerAccuracy) {
			this.logAction('Dodged');
			return 0;
		}

		const damageRoll = NumberHelper.random(1, 10);
		const attackerDamage = damage + damageRoll;
		const armorRoll = NumberHelper.random(1, 10);
		const armor = victim.stats.armor.effectiveValue.get() + armorRoll;
		const damaged = Math.max(0, Math.round(attackerDamage - armor));
		this.logAction(`Hit for ${damaged} health`);
		victim.stats.health.consume(damaged);

		return damaged;
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

		let anyoneAttacked = false;
		let totalDamage = 0;

		for (let i = 0, max = this.model.members.count(); i < max; i++) {
			const unit = this.model.members.get(i);
			const victim = group.members.random();
			if (!victim) continue;
			const isNeighborTile = this.model.position.isNeighborPosition(group.position);
			const isInRange = isNeighborTile || true; // todo: calculate range

			if (isNeighborTile) {
				anyoneAttacked = true;
				this.logAction(`${unit.name.get()} attacking ${victim.name.get()} with melee`);
				totalDamage += this.attack(
					victim,
					unit.stats.meleeAccuracy.effectiveValue.get(),
					unit.stats.meleeDamage.effectiveValue.get()
				);
			} else if (isInRange) {
				const hasRangedWeapon = unit.inventory.rangedWeapon.item.isSet();
				if (hasRangedWeapon) {
					anyoneAttacked = true;
					this.logAction(`${unit.name.get()} attacking ${victim.name.get()} with ranged attack`);
					const sprite = new SpriteModel();
					sprite.uri.set(SPRITE_DART);
					sprite.position.set(this.model.position);
					const rotation = group.position.getRotationFromYAxis(this.model.position);
					console.log('rotation', rotation.get());
					sprite.rotation.set(-rotation.get());

					this.save.travel.sprites.add(sprite);
					this.addChild(
						new AnimationVector2Controller(
							this.game,
							sprite.position,
							group.position,
							250
						).onFinished(
							() => {
								sprite.removeMyself();
								const damage = this.attack(
									victim,
									unit.stats.rangedAccuracy.effectiveValue.get(),
									unit.stats.rangedDamage.effectiveValue.get()
								);
								if (damage > 0) {
									this.save.triggerEvent('unit-hurt', group);
								}
							}
						)
					)
				} else {
					this.logAction(`${unit.name.get()} has no ranged weapon`);
				}
			}

		}

		if (anyoneAttacked) {
			this.model.stats.movement.consume(1);
			const target = group.position.sub(this.model.position).setSize(0.2);
			this.model.triggerEvent('started-moving', this.model);

			this.addChild(
				new AnimationVector2Controller(
					this.game,
					this.model.renderingOffset,
					target,
					100
				).onFinished(
					() => {
						this.addChild(
							new AnimationVector2Controller(
								this.game,
								this.model.renderingOffset,
								new Vector2(0, 0),
								100
							).onFinished(
								() => {
									this.model.triggerEvent('finished-moving', this.model);
								}
							)
						);
					}
				)
			);
		}

		if (totalDamage > 0) {
			this.save.triggerEvent('unit-hurt', group);
		}
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
