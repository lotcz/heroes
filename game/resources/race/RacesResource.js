import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import RaceResource from "./RaceResource";
import OrcsRace from "./races/OrcsRace";
import ElvesRace from "./races/ElvesRace";
import HumanRace from "./races/HumanRace";
import DragonsRace from "./races/DragonsRace";

export default class RacesResource extends ModelNodeTable {

	constructor() {
		super((id) => new RaceResource(id));

		this.add(new OrcsRace());
		this.add(new ElvesRace());
		this.add(new HumanRace());
		this.add(new DragonsRace());

	}

}
