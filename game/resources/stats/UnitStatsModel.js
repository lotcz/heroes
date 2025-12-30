import ObjectModel from "wgge/core/model/ObjectModel";
import StatModel from "./StatModel";
import {STAT_FLYING, STAT_HEALTH, STAT_MOVEMENT, STAT_WATER_BASED} from "../statDefinition/StatDefinitionsResource";

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
		this.waterBased = this.addProperty('waterBased', new StatModel(STAT_WATER_BASED, 0));

	}
}
