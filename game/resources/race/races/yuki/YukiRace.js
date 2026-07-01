import RaceResource from "../../RaceResource";
import YukiRaceNames from "./YukiRaceNames";
import YukiHunterUnit from "./units/YukiHunterUnit";

export default class YukiRace extends RaceResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Yuki');
		this.townImage.set('img/location/yuki-tent.png');
		this.names = this.addProperty('names', new YukiRaceNames());
		this.malePortraits = [
			'img/character/yuki/portrait/male-1.jpg'
		];
		this.femalePortraits = [
			'img/character/yuki/portrait/female-1.jpg',
		];

		this.unitTypes.add(new YukiHunterUnit(itemDefinitions, biotopes));

		this.addPreferredBiotope(biotopes.snow);
		this.addPreferredBiotope(biotopes.peaks);
	}
}
