import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class UnitTypesResources extends ModelNodeTable {

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
