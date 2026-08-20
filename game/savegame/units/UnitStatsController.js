import ControllerBase from "wgge/core/controller/ControllerBase";
import CollectionController from "wgge/core/controller/CollectionController";
import StatController from "../../resources/stats/StatController";
import StatEffectModel from "../../resources/stats/effects/StatEffectModel";
import {
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

	/**
	 * StatEffectModel
	 */
	meleeWeaponsAccuracyBonus;

	/**
	 * StatEffectModel
	 */
	meleeWeaponsDamageBonus;

	/**
	 * StatEffectModel
	 */
	rangedWeaponsAccuracyBonus;

	/**
	 * StatEffectModel
	 */
	rangedWeaponsDamageBonus;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.meleeWeaponsAccuracyBonus = this.addEffect('Melee Weapons skill', STAT_MELEE_ACCURACY);
		this.meleeWeaponsDamageBonus = this.addEffect('Melee Weapons skill', STAT_MELEE_DAMAGE);
		this.rangedWeaponsAccuracyBonus = this.addEffect('Ranged Weapons skill', STAT_RANGED_ACCURACY);
		this.rangedWeaponsDamageBonus = this.addEffect('Ranged Weapons skill', STAT_RANGED_DAMAGE);

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
				this.meleeWeaponsAccuracyBonus.amount.set(this.model.meleeWeapons.effectiveValue.get());
				this.meleeWeaponsDamageBonus.amount.set(Math.floor(this.model.meleeWeapons.effectiveValue.get() / 5));
			},
			true
		);

		this.addAutoEvent(
			this.model.rangedWeapons,
			'change',
			() => {
				this.rangedWeaponsAccuracyBonus.amount.set(this.model.rangedWeapons.effectiveValue.get());
				this.rangedWeaponsDamageBonus.amount.set(Math.floor(this.model.rangedWeapons.effectiveValue.get() / 5));
			},
			true
		);

	}

	addEffect(sourceName, defId) {
		return this.defaultEffects.add(new StatEffectModel(sourceName, defId));
	}

	activateInternal() {
		this.defaultEffects.forEach((e) => this.model.effects.add(e));
	}

	deactivateInternal() {
		this.defaultEffects.forEach((e) => this.model.effects.remove(e));
	}

}
