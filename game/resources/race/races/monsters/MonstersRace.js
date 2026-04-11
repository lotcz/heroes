import RaceResource from "../../RaceResource";
import KrakenUnit from "./units/KrakenUnit";
import LionUnit from "./units/LionUnit";
import SharksUnit from "./units/SharksUnit";
import RaceNamesResources from "../../RaceNamesResource";

export default class MonstersRace extends RaceResource {

	constructor() {
		super();

		this.name.set('Monsters');
		this.names = this.addProperty('names', new RaceNamesResources());

		this.unitTypes.add(new LionUnit());
		this.unitTypes.add(new KrakenUnit());
		this.unitTypes.add(new SharksUnit());
	}
}
