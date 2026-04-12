import IntValue from "wgge/core/model/value/IntValue";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import {MIN_RIVER_LEVEL} from "./TileRiverModel";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class TileRiversModel extends ModelNodeCollection {

	/**
	 * @type IntValue
	 */
	strength;

	/**
	 * @type BoolValue
	 */
	lake;

	constructor() {
		super();

		this.strength = this.addProperty('strength', new IntValue(0, false));
		this.lake = this.addProperty('lake', new BoolValue(false));
		this.children.addOnChangeListener(() => this.updateStrength());

	}

	updateStrength() {
		this.strength.set(this.children.reduce((prev, next) => prev < next.strength.get() ? next.strength.get() : prev, 0));
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
