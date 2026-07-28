import LocationModel from "./LocationModel";
import TableWithNames from "../../resources/basic/TableWithNames";

export default class LocationsModel extends TableWithNames {

	constructor() {
		super((id) => new LocationModel(id));

	}

	getNames() {
		return this.map(l => l.name.get());
	}

}
