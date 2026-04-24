import BoolValue from "wgge/core/model/value/BoolValue";
import StatModel from "./StatModel";

/**
 * Used for traits like flying, swimming, ...
 */
export default class TraitStatModel extends StatModel {

	/**
	 * @type BoolValue
	 * True if unit currently has the trait, only valid for traits
	 */
	traitActive;

	constructor(definitionId, initialValue = 0, persistent = true) {
		super(persistent, initialValue, persistent);

		this.traitActive = this.addProperty('traitActive', new BoolValue(false, false));
		this.effectiveValue.addOnChangeListener(() => this.traitActive.set(this.effectiveValue.get() > 0), true);

		// base value changed - recalculate effects
		this.baseValue.addOnChangeListener(() => this.effectiveValue.set(this.baseValue.get()), true);

	}

}
