import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import UnitResource from "./UnitResource";
import DragonUnit from "./units/DragonUnit";

export default class UnitsResource extends ModelNodeTable {

	constructor() {
		super((id) => new UnitResource(id));

		this.add(new DragonUnit());
		
	}

}
