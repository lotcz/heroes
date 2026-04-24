import ObjectModel from "wgge/core/model/ObjectModel";
import StringValue from "wgge/core/model/value/StringValue";
import IntValue from "wgge/core/model/value/IntValue";

export default class StatEffectModel extends ObjectModel {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * Dictates which stat this affects
	 * @type IntValue
	 */
	definitionId;

	/**
	 * @type IntValue
	 */
	amount;

	/**
	 * When null, effect is permanent
	 * @type IntValue
	 */
	remainsTurns;

	constructor(name, definitionId, amount = 1, remainsTurns = null) {
		super(true);

		this.name = this.addProperty('name', new StringValue(name));
		this.definitionId = this.addProperty('definitionId', new IntValue(definitionId));
		this.amount = this.addProperty('amount', new IntValue(amount));
		this.remainsTurns = this.addProperty('remainsTurns', new IntValue(remainsTurns));

	}

}
