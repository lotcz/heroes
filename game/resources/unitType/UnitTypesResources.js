import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class UnitTypesResources extends ModelNodeTable {

	randomSwimming() {
		return ArrayHelper.random(this.filter((u) => u.baseStats.swimming.traitActive.get()));
	}

	randomFlying() {
		return ArrayHelper.random(this.filter((u) => u.baseStats.flying.traitActive.get()));
	}

	randomWalking() {
		return ArrayHelper.random(this.filter((u) => u.baseStats.walking.traitActive.get()));
	}

	randomForBiotope(biotopeId) {
		return ArrayHelper.random(this.filter((u) => u.prefersBiotope(biotopeId)));
	}

	randomForTile(tile) {
		const candidates = this.filter(
			(u) => u.prefersBiotope(tile.biotopeId.get())
				&& (
					(tile.isWater() && u.baseStats.canStepOnWater())
					|| (tile.isLand() && u.baseStats.canStepOnLand())
				)
		);
		return ArrayHelper.random(candidates);
	}

}
