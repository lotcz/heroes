import RiverModel from "./RiverModel";
import TableWithNames from "../../basic/TableWithNames";

export default class RiversModel extends TableWithNames {

	constructor() {
		super((id) => new RiverModel(id));

	}

}
