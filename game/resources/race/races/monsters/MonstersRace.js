import RaceResource from "../../RaceResource";
import KrakenUnit from "./units/KrakenUnit";
import LionUnit from "./units/LionUnit";
import SharksUnit from "./units/SharksUnit";
import RaceNamesResources from "../../RaceNamesResource";
import StormUnit from "./units/StormUnit";
import OrangutanUnit from "./units/OrangutanUnit";
import GorillaUnit from "./units/GorillaUnit";
import SlothUnit from "./units/SlothUnit";
import BrownBearUnit from "./units/BrownBearUnit";
import CrocodilleUnit from "./units/CrocodilleUnit";

export default class MonstersRace extends RaceResource {

	constructor() {
		super();

		this.name.set('Monsters');
		this.names = this.addProperty('names', new RaceNamesResources());

		this.unitTypes.add(new LionUnit());
		this.unitTypes.add(new OrangutanUnit());
		this.unitTypes.add(new GorillaUnit());
		this.unitTypes.add(new SlothUnit());
		this.unitTypes.add(new BrownBearUnit());

		this.unitTypes.add(new KrakenUnit());
		this.unitTypes.add(new SharksUnit());
		this.unitTypes.add(new CrocodilleUnit());

		this.unitTypes.add(new StormUnit());
	}
}
