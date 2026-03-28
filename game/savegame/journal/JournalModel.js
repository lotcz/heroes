import ObjectModel from "wgge/core/model/ObjectModel";
import ActionLogModel from "./ActionLogModel";

export default class JournalModel extends ObjectModel {

	/**
	 * @type ActionLogModel
	 */
	actionLog;

	constructor() {
		super(true);

		this.actionLog = this.addProperty('actionLog', new ActionLogModel());
	}

}
