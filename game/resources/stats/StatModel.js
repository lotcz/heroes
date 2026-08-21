import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";
import NullableNode from "wgge/core/model/value/NullableNode";
import EffectsCollectionModel from "./effects/EffectsCollectionModel";

/**
 * Used for basic stats like attack strength, armor, ...
 */
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
	 * @type EffectsCollectionModel
	 */
	effects;

	constructor(definitionId, initialValue = 0, persistent = true) {
		super(persistent);

		this.definitionId = this.addProperty('definitionId', new IntValue(definitionId));
		this.definition = this.addProperty('definition', new NullableNode(null, false));

		this.baseValue = this.addProperty('baseValue', new IntValue(initialValue));
		this.effectiveValue = this.addProperty('effectiveValue', new IntValue(initialValue, false));
		this.effectiveValue.addOnChangeListener(() => this.triggerEvent('change'));
		
		this.effects = this.addProperty('effects', new EffectsCollectionModel(false));

		this.baseValue.addOnChangeListener(() => this.recalculateEffects());
		this.effects.addOnChangeListener(() => this.recalculateEffects());
		this.effects.addEventListener('stat-change', () => this.recalculateEffects());
	}

	recalculateEffects() {
		const effectsValue = this.effects.map((e) => e.amount.get()).reduce((prev, current) => prev + current, 0);
		this.effectiveValue.set(this.baseValue.get() + effectsValue);
	}

}
