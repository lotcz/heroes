import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import RiverModel from "./RiverModel";

export default class RiversModel extends ModelNodeTable {

	constructor() {
		super((id) => new RiverModel(id));

	}

	nameExists(name) {
		return this.exists((l) => l.name.equalsTo(name));
	}

	addRiver(name) {
		const river = this.add();
		river.name.set(name);
		return river;
	}
}
