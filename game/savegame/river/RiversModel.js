import RiverModel from "./RiverModel";
import TableWithNames from "../../resources/basic/TableWithNames";

export default class RiversModel extends TableWithNames {

	constructor() {
		super((id) => new RiverModel(id));

	}

}
