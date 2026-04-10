import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import UnitTypeResource from "./UnitTypeResource";
import DragonUnit from "./types/DragonUnit";
import KrakenUnit from "./types/KrakenUnit";
import OrcUnit from "./types/OrcUnit";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import DarkKnightUnit from "./types/DarkKnightUnit";
import LionUnit from "./types/LionUnit";
import SharksUnit from "./types/SharksUnit";
import RogueUnit from "./types/RogueUnit";

export default class UnitTypesResource extends ModelNodeTable {

	constructor() {
		super((id) => new UnitTypeResource(id));

		this.add(new DragonUnit());
		this.add(new DarkKnightUnit());
		this.add(new KrakenUnit());
		this.add(new OrcUnit());
		this.add(new LionUnit());
		this.add(new SharksUnit());
		this.add(new RogueUnit());

	}

	randomWaterBased() {
		return ArrayHelper.random(this.filter((u) => u.baseStats.waterBased.baseValue.equalsTo(1)));
	}

	randomFlying() {
		return ArrayHelper.random(this.filter((u) => u.baseStats.flying.baseValue.equalsTo(1)));
	}

	randomNormal() {
		return ArrayHelper.random(this.filter((u) => u.baseStats.waterBased.baseValue.equalsTo(0)));
	}
}
