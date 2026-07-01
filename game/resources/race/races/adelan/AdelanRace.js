import RaceResource from "../../RaceResource";
import AdelanRaceNames from "./AdelanRaceNames";
import AdelanHunterUnit from "./units/AdelanHunterUnit";

export default class AdelanRace extends RaceResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Adelan');
		this.townImage.set('img/location/hut.png');
		this.names = this.addProperty('names', new AdelanRaceNames());
		this.malePortraits = [
			'img/character/adelan/portrait/male-1.jpg'
		];
		this.femalePortraits = [
			'img/character/adelan/portrait/female-1.jpg',
			'img/character/adelan/portrait/female-2.jpg'
		];

		this.unitTypes.add(new AdelanHunterUnit(itemDefinitions, biotopes));

		this.addPreferredBiotope(biotopes.grassland);

	}
}
