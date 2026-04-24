import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";
import StatEffectModel from "./StatEffectModel";

export default class TemporaryStatEffectModel extends ObjectModel {

	/**
	 * @type StatEffectModel
	 */
	effect;

	/**
	 * @type IntValue
	 */
	remainsTurns;

	constructor(name, definitionId, amount = 1, remainsTurns = null, persistent = true) {
		super(persistent);

		this.effect = this.addProperty('name', new StatEffectModel(name, definitionId, amount, persistent));
		this.remainsTurns = this.addProperty('remainsTurns', new IntValue(remainsTurns));

	}

}
