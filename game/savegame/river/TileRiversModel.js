import IntValue from "wgge/core/model/value/IntValue";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import TileRiverModel, {MIN_RIVER_LEVEL} from "./TileRiverModel";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class TileRiversModel extends ModelNodeCollection {

	/**
	 * @type IntValue
	 */
	strength;

	/**
	 * @type IntValue
	 */
	riverId;

	/**
	 * @type BoolValue
	 */
	lake;

	constructor() {
		super(() => new TileRiverModel());

		this.strength = this.addProperty('strength', new IntValue(0, false));
		this.riverId = this.addProperty('riverId', new IntValue(null, false));
		this.lake = this.addProperty('lake', new BoolValue(false));
		this.children.addOnChangeListener(() => this.updateRivers());

	}

	updateRivers() {
		this.strength.set(this.children.reduce((prev, next) => prev < next.strength.get() ? next.strength.get() : prev, 0));
		if (this.isEmpty()) {
			this.riverId.set(null);
		} else {
			const tileRiver = this.reduce((prev, current) => prev.strength.get() < current.strength.get() ? current : prev, this.get(0));
			this.riverId.set(tileRiver.riverId.get());
		}
	}

	isLake() {
		return this.lake.get();
	}

	isRiver() {
		if (this.isLake()) return false;
		return this.strength.get() >= MIN_RIVER_LEVEL;
	}

	isStream() {
		if (this.isLake() || this.isRiver()) return false;
		return this.strength.get() > 0;
	}

}
