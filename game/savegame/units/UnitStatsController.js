import ControllerBase from "wgge/core/controller/ControllerBase";
import CollectionController from "wgge/core/controller/CollectionController";
import StatController from "../../resources/stats/StatController";
import StatEffectModel from "../../resources/stats/effects/StatEffectModel";
import {
	STAT_DODGING,
	STAT_HEALTH,
	STAT_MELEE_ACCURACY,
	STAT_MELEE_DAMAGE,
	STAT_RANGED_ACCURACY,
	STAT_RANGED_DAMAGE
} from "../../resources/stats/definition/StatDefinitionsResource";
import Collection from "wgge/core/Collection";

export default class UnitStatsController extends ControllerBase {

	/**
	 * @type UnitStatsModel
	 */
	model;

	defaultEffects = new Collection();

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.strengthMeleeDamageBonus = this.addEffect('Strength', STAT_MELEE_DAMAGE);
		this.strengthHealthBonus = this.addEffect('Strength', STAT_HEALTH);
		this.dexterityRangedAccuracyBonus = this.addEffect('Dexterity', STAT_RANGED_ACCURACY);
		this.dexterityMeleeAccuracyBonus = this.addEffect('Dexterity', STAT_MELEE_ACCURACY);
		this.dexterityDodgingBonus = this.addEffect('Dexterity', STAT_DODGING);

		this.meleeWeaponsAccuracyBonus = this.addEffect('Melee Weapons skill', STAT_MELEE_ACCURACY);
		this.meleeWeaponsDamageBonus = this.addEffect('Melee Weapons skill', STAT_MELEE_DAMAGE);
		this.rangedWeaponsAccuracyBonus = this.addEffect('Ranged Weapons skill', STAT_RANGED_ACCURACY);
		this.rangedWeaponsDamageBonus = this.addEffect('Ranged Weapons skill', STAT_RANGED_DAMAGE);
		this.evasionDodgingBonus = this.addEffect('Evasion skill', STAT_DODGING);

		this.addAutoEvent(
			this.model.strength,
			'change',
			() => {
				this.strengthMeleeDamageBonus.amount.set(this.model.strength.effectiveValue.get());
				this.strengthHealthBonus.amount.set(this.model.strength.effectiveValue.get());
			},
			true
		);

		this.addAutoEvent(
			this.model.dexterity,
			'change',
			() => {
				this.dexterityRangedAccuracyBonus.amount.set(this.model.dexterity.effectiveValue.get() * 10);
				this.dexterityMeleeAccuracyBonus.amount.set(this.model.dexterity.effectiveValue.get() * 10);
				this.dexterityDodgingBonus.amount.set(this.model.dexterity.effectiveValue.get() * 10);
			},
			true
		);

		this.addChild(
			new CollectionController(
				this.game,
				this.model.all,
				(m) => new StatController(this.game, m)
			)
		);

		this.addAutoEvent(
			this.model.meleeWeapons,
			'change',
			() => {
				this.meleeWeaponsAccuracyBonus.amount.set(this.model.meleeWeapons.effectiveValue.get() * 10);
				this.meleeWeaponsDamageBonus.amount.set(Math.floor(this.model.meleeWeapons.effectiveValue.get() / 5));
			},
			true
		);

		this.addAutoEvent(
			this.model.rangedWeapons,
			'change',
			() => {
				this.rangedWeaponsAccuracyBonus.amount.set(this.model.rangedWeapons.effectiveValue.get() * 10);
				this.rangedWeaponsDamageBonus.amount.set(Math.floor(this.model.rangedWeapons.effectiveValue.get() / 5));
			},
			true
		);

		this.addAutoEvent(
			this.model.evasion,
			'change',
			() => {
				this.evasionDodgingBonus.amount.set(this.model.evasion.effectiveValue.get() * 10);
			},
			true
		);

	}

	addEffect(sourceName, defId) {
		return this.defaultEffects.add(new StatEffectModel(sourceName, defId, 0, false));
	}

	activateInternal() {
		this.defaultEffects.forEach((e) => this.model.effects.add(e));
	}

	deactivateInternal() {
		this.defaultEffects.forEach((e) => this.model.effects.remove(e));
	}

}
