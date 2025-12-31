import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";
import IntValue from "wgge/core/model/value/IntValue";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class StatDefinitionResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	description;

	/**
	 * @type IntValue
	 */
	base;

	/**
	 * @type IntValue
	 */
	min;

	/**
	 * @type IntValue
	 */
	max;

	/**
	 * @type BoolValue
	 * True/False values like flying or waterBased
	 */
	isTrait;

	constructor(id) {
		super(id);

		this.name = this.addProperty('name', new StringValue(`Stat ${id}`));
		this.description = this.addProperty('description', new StringValue('description'));
		this.base = this.addProperty('base', new IntValue());
		this.min = this.addProperty('min', new IntValue(0));
		this.max = this.addProperty('max', new IntValue());
		this.isTrait = this.addProperty('isTrait', new BoolValue());
	}

}
