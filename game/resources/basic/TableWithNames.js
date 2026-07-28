import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";

export default class TableWithNames extends ModelNodeTable {

	getNames() {
		return this.map(row => row.name.get());
	}

	nameExists(name) {
		const names = this.getNames();
		return names.includes(name);
	}
}
