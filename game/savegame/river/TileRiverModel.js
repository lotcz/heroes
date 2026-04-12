import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";
import Vector2 from "wgge/core/model/vector/Vector2";

export const MIN_RIVER_LEVEL = 14;

export default class TileRiverModel extends ObjectModel {

	/**
	 * @type IntValue
	 */
	riverId;

	/**
	 * @type IntValue
	 */
	strength;

	/**
	 * Target tile position - where river flows to or from
	 * @type Vector2
	 */
	targetPosition;

	/**
	 * Random jitter vector [-0.5 ... 0.5, -0.5 ... 0.5]
	 * @type Vector2
	 */
	jitter;

	constructor(riverId) {
		super();

		this.riverId = this.addProperty('riverId', new IntValue(riverId));
		this.strength = this.addProperty('strength', new IntValue());
		this.targetPosition = this.addProperty('targetPosition', new Vector2());
		this.jitter = this.addProperty('jitter', new Vector2());

	}

	static isRiver(strength) {
		return strength >= MIN_RIVER_LEVEL;
	}
}
