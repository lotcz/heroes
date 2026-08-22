import IntValue from "wgge/core/model/value/IntValue";
import StatModel from "./StatModel";

/**
 * Used for expendable stats like health, hunger, thirst...
 */
export default class ExpendableStatModel extends StatModel {

	/**
	 * @type IntValue
	 * Current value. E.g. actual current health or melee attack. Only used for expendables
	 */
	currentValue;

	constructor(definitionId, initialValue = 0, persistent = true) {
		super(definitionId, initialValue, persistent);

		this.currentValue = this.addProperty('currentValue', new IntValue(initialValue));

		// effective value changed - reset current value and preserve percentage
		this.effectiveValue.addOnChangeListener(
			(changeEvent) => {
				if (changeEvent.oldValue > 0) {
					const percentage = this.currentValue.get() / changeEvent.oldValue;
					this.currentValue.set(changeEvent.newValue * percentage);
				}
				if (this.currentValue.get() > this.effectiveValue.get()) {
					this.currentValue.set(this.effectiveValue.get());
				}
				if (this.currentValue.get() < 0) {
					this.currentValue.set(0);
				}
			}
		);

	}

	restore(amount = null) {
		if (amount === null) {
			this.restore(this.effectiveValue.get() - this.currentValue.get());
			return;
		}
		const actual = Math.min(amount, this.effectiveValue.get() - this.currentValue.get());
		this.currentValue.increase(actual);
	}

	consume(amount = null) {
		if (amount === null) {
			this.consume(this.currentValue.get());
			return;
		}
		const actual = Math.min(amount, this.currentValue.get());
		this.currentValue.increase(-actual);
	}

}
