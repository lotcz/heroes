import ObjectModel from "wgge/core/model/ObjectModel";
import StatModel from "../../../resources/stats/StatModel";
import {
	STAT_ARMOR,
	STAT_FLYING,
	STAT_HEALTH,
	STAT_MELEE,
	STAT_RAFTING,
	STAT_RANGED,
	STAT_SWIMMING,
	STAT_WALKING
} from "../../../resources/stats/definition/StatDefinitionsResource";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ExpendableStatModel from "../../../resources/stats/ExpendableStatModel";
import TraitStatModel from "../../../resources/stats/TraitStatModel";

export default class UnitStatsModel extends ObjectModel {

	/**
	 * @type ModelNodeCollection
	 */
	basics;

	/**
	 * @type ModelNodeCollection
	 */
	expendables;

	/**
	 * @type ModelNodeCollection
	 */
	traits;

	/**
	 * @type ExpendableStatModel
	 */
	health;

	/**
	 * @type StatModel
	 */
	melee;

	/**
	 * @type StatModel
	 */
	ranged;

	/**
	 * @type StatModel
	 */
	armor;

	/**
	 * @type TraitStatModel
	 */
	flying;

	/**
	 * @type TraitStatModel
	 */
	swimming;

	/**
	 * @type TraitStatModel
	 */
	walking;

	/**
	 * @type TraitStatModel
	 */
	rafting;

	constructor() {
		super(true);

		this.basics = this.addProperty('basics', new ModelNodeCollection(null, false));
		this.expendables = this.addProperty('expendables', new ModelNodeCollection(null, false));
		this.traits = this.addProperty('traits', new ModelNodeCollection(null, false));

		this.health = this.addExpendable(STAT_HEALTH, 10);
		this.health.currentValue.addOnChangeListener(
			() => {
				if (this.health.currentValue.get() <= 0) this.triggerEvent('death');
			}
		);

		this.melee = this.addBasic(STAT_MELEE, 3);
		this.ranged = this.addBasic(STAT_RANGED, 1);
		this.armor = this.addBasic(STAT_ARMOR, 1);

		this.flying = this.addTrait(STAT_FLYING, 0);
		this.swimming = this.addTrait(STAT_SWIMMING, 0);
		this.walking = this.addTrait(STAT_WALKING, 1);
		this.rafting = this.addTrait(STAT_RAFTING, 0);

	}

	addBasic(definitionId, baseValue) {
		return this.basics.add(this.addProperty(`stat-${definitionId}`, new StatModel(definitionId, baseValue)));
	}

	addExpendable(definitionId, baseValue) {
		return this.expendables.add(this.addProperty(`stat-${definitionId}`, new ExpendableStatModel(definitionId, baseValue)));
	}

	addTrait(definitionId, baseValue) {
		return this.traits.add(this.addProperty(`stat-${definitionId}`, new TraitStatModel(definitionId, baseValue)));
	}

}
