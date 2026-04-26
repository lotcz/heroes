import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import RaceResource from "./RaceResource";
import TroglodyteRace from "./races/troglodyte/TroglodyteRace";
import YukiRace from "./races/yuki/YukiRace";
import AdelanRace from "./races/adelan/AdelanRace";
import KalingaRace from "./races/kalinga/KalingaRace";
import MonstersRace from "./races/monsters/MonstersRace";

export default class RacesResource extends ModelNodeTable {

	/**
	 * @type MonstersRace
	 */
	monsters;

	/**
	 * @type ModelNodeTable<RaceResource>
	 */
	others;

	constructor(itemsDefinitions) {
		super((id) => new RaceResource(id));

		this.monsters = this.add(new MonstersRace(itemsDefinitions));
		this.others = this.addProperty('others', new ModelNodeTable((id) => new RaceResource(id), false));

		this.addOther(new TroglodyteRace(itemsDefinitions));
		this.addOther(new YukiRace(itemsDefinitions));
		this.addOther(new AdelanRace(itemsDefinitions));
		this.addOther(new KalingaRace(itemsDefinitions));
	}

	addOther(race) {
		this.add(this.others.add(race));
	}

}
