import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import RaceResource from "./RaceResource";
import TroglodyteRace from "./races/troglodyte/TroglodyteRace";
import YukiRace from "./races/yuki/YukiRace";
import AdelanRace from "./races/adelan/AdelanRace";
import KalingaRace from "./races/kalinga/KalingaRace";
import MonstersRace from "./races/monsters/MonstersRace";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class RacesResource extends ModelNodeTable {

	/**
	 * @type MonstersRace
	 */
	monsters;

	/**
	 * @type ModelNodeTable<RaceResource>
	 */
	others;

	constructor(itemsDefinitions, biotopes) {
		super((id) => new RaceResource(id));

		this.monsters = this.add(new MonstersRace(itemsDefinitions, biotopes));
		this.others = this.addProperty('others', new ModelNodeTable((id) => new RaceResource(id), false));

		this.addOther(new TroglodyteRace(itemsDefinitions, biotopes));
		this.addOther(new YukiRace(itemsDefinitions, biotopes));
		this.addOther(new AdelanRace(itemsDefinitions, biotopes));
		this.addOther(new KalingaRace(itemsDefinitions, biotopes));
	}

	addOther(race) {
		this.add(this.others.add(race));
	}

	randomForBiotope(biotopeId) {
		return ArrayHelper.random(this.filter((r) => r.prefersBiotope(biotopeId)));
	}

	randomForTile(tile) {
		return this.randomForBiotope(tile.biotopeId.get());
	}

}
