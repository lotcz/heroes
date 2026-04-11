import RaceResource from "../../RaceResource";
import KalingaRaceNames from "./KalingaRaceNames";
import KalingaWarriorUnit from "./units/KalingaWarriorUnit";

export default class KalingaRace extends RaceResource {

	constructor() {
		super();

		this.name.set('Kalinga');
		this.townImage.set('img/poi/town.png');
		this.names = this.addProperty('names', new KalingaRaceNames());

		this.unitTypes.add(new KalingaWarriorUnit());
	}
}
