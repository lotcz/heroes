import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";
import NullableNode from "wgge/core/model/value/NullableNode";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class StatModel extends ObjectModel {

	/**
	 * @type IntValue
	 */
	definitionId;

	/**
	 * @type NullableNode<StatDefinitionResource>
	 */
	definition;

	/**
	 * @type IntValue
	 * Initial value. Like e.g. initial max. health or base melee attack
	 */
	baseValue;

	/**
	 * @type IntValue
	 * After applying effects. E.g. Max. health after adding +1 from spell or melee attack after adding +2 from weapon
	 */
	effectiveValue;

	/**
	 * @type IntValue
	 * Current value. E.g. actual current health or melee attack. Only used for expendable, not stats or traits
	 */
	currentValue;

	/**
	 * @type BoolValue
	 * True if unit currently has the trait, only valid for traits
	 */
	traitActive;

	constructor(definitionId, initialValue = 0, persistent = true) {
		super(persistent);

		this.definitionId = this.addProperty('definitionId', new IntValue(definitionId));
		this.definition = this.addProperty('definition', new NullableNode(null, false));

		this.baseValue = this.addProperty('baseValue', new IntValue(initialValue));
		this.effectiveValue = this.addProperty('effectiveValue', new IntValue(initialValue, false));
		this.currentValue = this.addProperty('currentValue', new IntValue(initialValue, false));

		this.traitActive = this.addProperty('traitActive', new BoolValue(false, false));
		this.effectiveValue.addOnChangeListener(() => this.traitActive.set(this.effectiveValue.get() > 0), true);

		// base value changed - reset everything
		this.baseValue.addOnChangeListener(() => this.effectiveValue.set(this.baseValue.get()), true);

	}

}
