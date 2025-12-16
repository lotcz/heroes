import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import FactionStyleResource from "./FactionStyleResource";
import OrcsFaction from "./data/OrcsFaction";
import ElvesFaction from "./data/ElvesFaction";

export default class FactionStylesResource extends ModelNodeTable {

	constructor() {
		super((id) => new FactionStyleResource(id));

		this.add(new OrcsFaction());
		this.add(new ElvesFaction());

	}

}
