import RaceResource from "../../RaceResource";
import KalingaRaceNames from "./KalingaRaceNames";
import KalingaWarriorUnit from "./units/KalingaWarriorUnit";

export default class KalingaRace extends RaceResource {

	constructor(itemDefinitions) {
		super();

		this.name.set('Kalinga');
		this.townImage.set('img/location/kalinga-village.png');
		this.names = this.addProperty('names', new KalingaRaceNames());

		this.unitTypes.add(new KalingaWarriorUnit(itemDefinitions));
	}
}
