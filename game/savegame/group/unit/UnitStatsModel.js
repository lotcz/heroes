import ObjectModel from "wgge/core/model/ObjectModel";
import StatModel from "../../../resources/stats/StatModel";
import {
	STAT_DEFENSE,
	STAT_FLYING,
	STAT_HEALTH,
	STAT_MELEE,
	STAT_MOVEMENT,
	STAT_RANGED,
	STAT_SWIMMING,
	STAT_WALKING
} from "../../../resources/statDefinition/StatDefinitionsResource";

export default class UnitStatsModel extends ObjectModel {

	/**
	 * @type StatModel
	 */
	health;

	/**
	 * @type StatModel
	 */
	movement;

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
	defense;

	/**
	 * @type StatModel
	 */
	flying;

	/**
	 * @type StatModel
	 */
	swimming;

	/**
	 * @type StatModel
	 */
	walking;

	constructor() {
		super(true);

		this.health = this.addProperty('health', new StatModel(STAT_HEALTH, 10));
		this.movement = this.addProperty('movement', new StatModel(STAT_MOVEMENT, 3));
		this.melee = this.addProperty('melee', new StatModel(STAT_MELEE, 3));
		this.ranged = this.addProperty('ranged', new StatModel(STAT_RANGED, 1));
		this.defense = this.addProperty('defense', new StatModel(STAT_DEFENSE, 1));

		this.flying = this.addProperty('flying', new StatModel(STAT_FLYING, 0));
		this.swimming = this.addProperty('swimming', new StatModel(STAT_SWIMMING, 0));
		this.walking = this.addProperty('walking', new StatModel(STAT_WALKING, 1));

		this.health.currentValue.addOnChangeListener(
			() => {
				if (this.health.currentValue.get() <= 0) this.triggerEvent('death');
			}
		)
	}
}
