import FactionModel from "./FactionModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import TableWithNames from "../../basic/TableWithNames";

export default class FactionsModel extends TableWithNames {

	constructor() {
		super((id) => new FactionModel(id));

	}

	randomForTile(tile) {
		const biotopeId = tile.biotopeId.get();
		const candidates = this.filter((f) => f.race.get().prefersBiotope(biotopeId));
		return ArrayHelper.random(candidates);
	}

}
