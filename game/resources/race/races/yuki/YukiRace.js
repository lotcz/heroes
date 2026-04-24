import RaceResource from "../../RaceResource";
import YukiRaceNames from "./YukiRaceNames";
import YukiHunterUnit from "./units/YukiHunterUnit";

export default class YukiRace extends RaceResource {

	constructor() {
		super();

		this.name.set('Yuki');
		this.townImage.set('img/location/yuki-tent.png');
		this.names = this.addProperty('names', new YukiRaceNames());

		this.unitTypes.add(new YukiHunterUnit());
	}
}
