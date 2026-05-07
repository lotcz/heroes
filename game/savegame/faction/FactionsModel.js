import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import FactionModel from "./FactionModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class FactionsModel extends ModelNodeTable {

	constructor() {
		super((id) => new FactionModel(id));

	}

	randomForTile(tile) {
		const biotopeId = tile.biotopeId.get();
		const candidates = this.filter((f) => f.race.get().prefersBiotope(biotopeId));
		return ArrayHelper.random(candidates);
	}

}
