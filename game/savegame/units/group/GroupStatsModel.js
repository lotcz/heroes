import ObjectModel from "wgge/core/model/ObjectModel";
import {STAT_MOVEMENT, STAT_RAFTING} from "../../../resources/stats/definition/StatDefinitionsResource";
import ExpendableStatModel from "../../../resources/stats/ExpendableStatModel";
import TraitStatModel from "../../../resources/stats/TraitStatModel";

/**
 * This is subset of group members stats calculated from member values
 */
export default class GroupStatsModel extends ObjectModel {

	/**
	 * @type ExpendableStatModel
	 */
	movement;

	/**
	 * Group knows rafting if at least one unit knows rafting
	 * @type TraitStatModel
	 */
	rafting;

	constructor() {
		super(true);

		this.movement = this.addProperty('movement', new ExpendableStatModel(STAT_MOVEMENT, 1));
		this.rafting = this.addProperty('rafting', new TraitStatModel(STAT_RAFTING, 0, false));

	}
}
