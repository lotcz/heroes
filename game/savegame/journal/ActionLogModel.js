import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import StringValue from "wgge/core/model/value/StringValue";
import IntValue from "wgge/core/model/value/IntValue";

export default class ActionLogModel extends ModelNodeCollection {

	/**
	 * @type IntValue
	 */
	maxLength;

	constructor() {
		super(() => new StringValue(), false);

		this.maxLength = this.addProperty('maxLength', new IntValue(100));

		this.addOnAddListener(() => this.checkLength());
		this.maxLength.addOnChangeListener(() => this.checkLength(), true);
	}

	checkLength() {
		while (this.count() > this.maxLength.get()) {
			this.remove(this.first());
		}
	}

	add(action) {
		super.add(new StringValue(action));
	}

	getResourcesForPreload() {
		return [];
	}

}
