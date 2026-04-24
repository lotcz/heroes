import ObjectModel from "wgge/core/model/ObjectModel";
import {STAT_MOVEMENT} from "../../resources/stats/definition/StatDefinitionsResource";
import ExpendableStatModel from "../../resources/stats/ExpendableStatModel";

/**
 * This is subset of group members stats calculated from member values
 */
export default class GroupStatsModel extends ObjectModel {

	/**
	 * @type StatModel
	 */
	movement

	constructor() {
		super(true);

		this.movement = this.addProperty('movement', new ExpendableStatModel(STAT_MOVEMENT, 3));

	}
}
