import AnimationVector2Controller from "wgge/core/controller/AnimationVector2Controller";
import ItemModel from "../../inventory/items/ItemModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import CollectionController from "wgge/core/controller/CollectionController";
import UnitController from "../UnitController";
import ControllerBase from "wgge/core/controller/ControllerBase";
import NumberHelper from "wgge/core/helper/NumberHelper";
import SpriteModel, {SPRITE_DART} from "../../travel/main/SpriteModel";

export default class GroupBasicController extends ControllerBase {

	/**
	 * @type GroupModel
	 */
	model;

	/**
	 * @type HeroesSaveGameModel
	 */
	save;

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
			() => this.enteringTile(),
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
			'move-to',
			(tile) => this.moveGroupTo(tile)
		);

		this.addAutoEvent(
			this.model,
			'attack-group',
			(group) => this.attackAnotherGroup(group)
		);

		this.addAutoEvent(
			this.model,
			'group-perished',
			() => this.leavingTile()
		);

	}

	logAction(action) {
		this.save.logAction(action);
	}

	leavingTile() {
		if (this.tile) {
			this.tile.group.set(null);
			this.tile = null;
		}
	}

	enteringTile() {
		this.leavingTile();
		this.tile = this.save.travel.tiles.getTile(this.model.position);
		if (this.tile) {
			this.tile.group.set(this.model);
		}
	}

	/**
	 * This assumes that it was already checked whether group can move to the tile
	 */
	moveGroupTo(tile) {
		this.model.renderingOffset.set(this.model.position.sub(tile.position));
		this.model.position.set(tile.position);

		this.addChild(
			new AnimationVector2Controller(
				this.game,
				this.model.renderingOffset,
				new Vector2(0, 0),
				200
			).onFinished(
				() => {
					this.model.stats.movement.consume(1);
				}
			)
		);

	}

	/**
	 * @returns Number of hit points or null when dodged
	 */
	attack(attacker, victim, accuracy, damage) {
		const accuracyRoll = NumberHelper.random(1, 10);
		const attackerAccuracy = accuracy + accuracyRoll;
		const dodgeRoll = NumberHelper.random(1, 10);
		const dodge = victim.stats.evasion.effectiveValue.get() + dodgeRoll;
		if (dodge > attackerAccuracy) {
			this.logAction(`${attacker.name.get()} missed ${victim.name.get()}`);
			return null;
		}

		const damageRoll = NumberHelper.random(1, 10);
		const attackerDamage = damage + damageRoll;
		const armorRoll = NumberHelper.random(1, 10);
		const armor = victim.stats.armor.effectiveValue.get() + armorRoll;
		const damaged = Math.max(0, Math.round(attackerDamage - armor));
		victim.stats.health.consume(damaged);

		if (damage > 0) {
			this.logAction(`${attacker.name.get()} hit ${victim.name.get()} for ${damage} damage`);
		} else {
			this.logAction(`${attacker.name.get()} made no damage to ${victim.name.get()}`);
		}

		if (victim.stats.health.currentValue.get() <= 0) {
			const unitType = victim.unitType.get();
			if (!unitType) {
				console.error('Dead victim has not unit type, cannot determine experience');
				return damaged;
			}
			this.model.awardExperience(unitType.experienceReward.get());
		}

		return damaged;
	}

	/**
	 * This assumes that it was already checked whether group can attack this group.
	 * However, if group is too far even for ranged units, it won't be damaged.
	 */
	attackAnotherGroup(group) {
		if (group.members.isEmpty()) {
			console.error('Attacked empty group');
			return;
		}

		const isNeighborTile = this.model.position.isNeighborPosition(group.position);
		const isInRange = isNeighborTile || true; // todo: calculate range
		const target = group.position.sub(this.model.position).setSize(0.2);

		this.addChild(
			new AnimationVector2Controller(
				this.game,
				this.model.renderingOffset,
				target,
				100
			).onFinished(
				() => {
					let totalDamage = 0;
					let movementConsumed = false;

					for (let i = 0, max = this.model.members.count(); i < max; i++) {
						const unit = this.model.members.get(i);
						const victim = group.members.random();
						if (!victim) continue;

						if (isNeighborTile) {
							totalDamage += this.attack(
								unit,
								victim,
								unit.stats.meleeAccuracy.effectiveValue.get(),
								unit.stats.meleeDamage.effectiveValue.get()
							);
						} else if (isInRange) {
							const hasRangedWeapon = unit.inventory.rangedWeapon.item.isSet();
							if (hasRangedWeapon) {
								const sprite = new SpriteModel();
								sprite.uri.set(SPRITE_DART);
								sprite.position.set(this.model.position);
								const rotation = group.position.getRotationFromYAxis(this.model.position);
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
												unit,
												victim,
												unit.stats.rangedAccuracy.effectiveValue.get(),
												unit.stats.rangedDamage.effectiveValue.get()
											);
											if (damage > 0) {
												this.save.triggerEvent('unit-hurt', group);
											}
											if (!movementConsumed) {
												this.model.stats.movement.consume(1);
												movementConsumed = true;
											}
										}
									)
								)
							} else {
								this.logAction(`${unit.name.get()} has no ranged weapon`);
							}
						}

					}

					if (isNeighborTile && totalDamage > 0) {
						this.save.triggerEvent('unit-hurt', group);
					}

					this.addChild(
						new AnimationVector2Controller(
							this.game,
							this.model.renderingOffset,
							new Vector2(0, 0),
							100
						).onFinished(
							() => {
								if (isNeighborTile) {
									this.model.stats.movement.consume(1);
								}
							}
						)
					);
				}
			)
		);


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

	deactivateInternal() {
		this.leavingTile();
	}

}
