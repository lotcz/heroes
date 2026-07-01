import RaceResource from "../../RaceResource";
import KalingaRaceNames from "./KalingaRaceNames";
import KalingaWarriorUnit from "./units/KalingaWarriorUnit";

export default class KalingaRace extends RaceResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Kalinga');
		this.townImage.set('img/location/kalinga-village.png');
		this.names = this.addProperty('names', new KalingaRaceNames());
		this.malePortraits = [
			'img/character/kalinga/portrait/male-1.jpg'
		];
		this.femalePortraits = [
			'img/character/kalinga/portrait/female-1.jpg',
		];

		this.unitTypes.add(new KalingaWarriorUnit(itemDefinitions, biotopes));

		this.addPreferredBiotope(biotopes.jungle);
	}
}
