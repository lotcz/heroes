import TroglodyteRaceNames from "./TroglodyteRaceNames";
import RaceResource from "../../RaceResource";
import TrogloShamanUnit from "./units/TrogloShamanUnit";
import TrogloWarriorUnit from "./units/TrogloWarriorUnit";

export default class TroglodyteRace extends RaceResource {

	constructor() {
		super();

		this.name.set('Troglodytes');
		this.townImage.set('img/location/yuki-tent.png');
		this.names = this.addProperty('names', new TroglodyteRaceNames());

		this.unitTypes.add(new TrogloShamanUnit());
		this.unitTypes.add(new TrogloWarriorUnit());
	}
}
