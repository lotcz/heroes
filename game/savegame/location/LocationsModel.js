import LocationModel from "./LocationModel";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";

export default class LocationsModel extends ModelNodeTable {

	constructor() {
		super((id) => new LocationModel(id));

	}

	nameExists(name) {
		return this.exists((l) => l.name.equalsTo(name));
	}

}
