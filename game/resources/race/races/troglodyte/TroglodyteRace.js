import TroglodyteRaceNames from "./TroglodyteRaceNames";
import RaceResource from "../../RaceResource";
import TrogloShamanUnit from "./units/TrogloShamanUnit";
import TrogloWarriorUnit from "./units/TrogloWarriorUnit";

export default class TroglodyteRace extends RaceResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Troglodytes');
		this.townImage.set('img/location/orc-village.png');
		this.names = this.addProperty('names', new TroglodyteRaceNames());
		this.malePortraits = [
			'img/character/troglodyte/portrait/male-1.jpg'
		];
		this.femalePortraits = [
			'img/character/troglodyte/portrait/female-1.jpg',
		];

		this.unitTypes.add(new TrogloShamanUnit(itemsDefinitions, biotopes));
		this.unitTypes.add(new TrogloWarriorUnit(itemsDefinitions, biotopes));

		this.addPreferredBiotope(biotopes.tundra);
	}
}
