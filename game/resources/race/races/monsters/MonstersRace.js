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
import SwampDragonUnit from "./units/SwampDragonUnit";
import BlackDragonUnit from "./units/BlackDragonUnit";

export default class MonstersRace extends RaceResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Monsters');
		this.names = this.addProperty('names', new RaceNamesResources());

		this.unitTypes.add(new LionUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new OrangutanUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new GorillaUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new SlothUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new BrownBearUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new SwampDragonUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new BlackDragonUnit(itemsDefinitions, biotopes));

		this.unitTypes.add(new KrakenUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new SharksUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new CrocodilleUnit(itemsDefinitions, biotopes));

		this.unitTypes.add(new StormUnit());
	}
}
