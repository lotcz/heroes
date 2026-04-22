import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import FactionModel from "./FactionModel";

export default class FactionsModel extends ModelNodeTable {

	constructor() {
		super((id) => new FactionModel(id));

	}

}
