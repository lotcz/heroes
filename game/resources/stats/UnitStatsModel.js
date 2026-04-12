import ObjectModel from "wgge/core/model/ObjectModel";
import StatModel from "./StatModel";
import {
	STAT_FLYING,
	STAT_HEALTH,
	STAT_MOVEMENT,
	STAT_SWIMMING,
	STAT_WALKING
} from "../statDefinition/StatDefinitionsResource";

export default class UnitStatsModel extends ObjectModel {

	/**
	 * @type StatModel
	 */
	health;

	/**
	 * @type StatModel
	 */
	movement

	/**
	 * @type StatModel
	 */
	flying;

	/**
	 * @type StatModel
	 */
	waterBased;

	constructor() {
		super(true);

		this.health = this.addProperty('health', new StatModel(STAT_HEALTH, 10));
		this.movement = this.addProperty('movement', new StatModel(STAT_MOVEMENT, 1));

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
