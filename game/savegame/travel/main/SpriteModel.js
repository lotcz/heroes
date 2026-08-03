import ImageModel from "wgge/game/resources/image/ImageModel";
import FloatValue from "wgge/core/model/value/FloatValue";
import Vector2 from "wgge/core/model/vector/Vector2";

export default class SpriteModel extends ImageModel {

	/**
	 * @type FloatValue
	 */
	rotation;

	/**
	 * @type Vector2
	 */
	position;

	constructor(persistent = false) {
		super(persistent);

		this.size.set(1, 1);
		this.rotation = this.addProperty('rotation', new FloatValue());
		this.position = this.addProperty('position', new Vector2());
	}

}
