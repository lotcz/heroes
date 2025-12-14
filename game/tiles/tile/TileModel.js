import ObjectModel from "wgge/core/model/ObjectModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import FloatValue from "wgge/core/model/value/FloatValue";

export default class TileModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	position;

	/**
	 * @type FloatValue
	 */
	height;

	constructor(x = 0, y = 0, height = 0) {
		super();

		this.position = this.addProperty('position', new Vector2(x, y));
		this.height = this.addProperty('height', new FloatValue(height));

	}

}
