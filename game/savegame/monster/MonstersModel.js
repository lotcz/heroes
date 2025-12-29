import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import MonsterModel from "./MonsterModel";

export default class MonstersModel extends ModelNodeTable {

	constructor() {
		super((id) => new MonsterModel(id));

	}

}
