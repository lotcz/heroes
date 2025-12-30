import ObjectModel from "wgge/core/model/ObjectModel";
import StringValue from "wgge/core/model/value/StringValue";
import IntValue from "wgge/core/model/value/IntValue";

export default class StatEffectModel extends ObjectModel {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type IntValue
	 */
	amount;

	/**
	 * @type BoolValue
	 */
	isPermanent;

	/**
	 * @type FloatValue
	 */
	remainsMs;

	constructor(name, initialValue = 0, persistent = true) {
		super(persistent);

		this.name = this.addProperty('name', new StringValue(name));
		this.baseValue = this.addProperty('baseValue', new IntValue(initialValue));
		this.current = this.addProperty('current', new IntValue(initialValue, false));

	}

	updateCurrent() {
		this.current.set(Math.ceil(this.currentFloat.get()));
	}
}
