import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import FactionStyleResource from "./FactionStyleResource";
import OrcsFaction from "./data/OrcsFaction";
import ElvesFaction from "./data/ElvesFaction";
import HumanFaction from "./data/HumanFaction";

export default class FactionStylesResource extends ModelNodeTable {

	constructor() {
		super((id) => new FactionStyleResource(id));

		this.add(new OrcsFaction());
		this.add(new ElvesFaction());
		this.add(new HumanFaction());

	}

}
