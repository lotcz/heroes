import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";
import NullableNode from "wgge/core/model/value/NullableNode";

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
	 * Current value. E.g. actual current health or melee attack.
	 */
	currentValue;

	constructor(definitionId, initialValue = 0, persistent = true) {
		super(persistent);

		this.definitionId = this.addProperty('definitionId', new IntValue(definitionId, false));
		this.definition = this.addProperty('definition', new NullableNode(null, false));

		this.baseValue = this.addProperty('baseValue', new IntValue(initialValue));
		this.effectiveValue = this.addProperty('effectiveValue', new IntValue(initialValue));
		this.currentValue = this.addProperty('currentValue', new IntValue(initialValue, false));

	}

}
