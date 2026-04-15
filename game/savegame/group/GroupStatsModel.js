import ObjectModel from "wgge/core/model/ObjectModel";
import StatModel from "../../resources/stats/StatModel";
import {STAT_MOVEMENT} from "../../resources/statDefinition/StatDefinitionsResource";

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

		this.movement = this.addProperty('movement', new StatModel(STAT_MOVEMENT, 3));

	}
}
