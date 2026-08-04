import ImageModel from "wgge/game/resources/image/ImageModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import Rotation from "wgge/core/model/vector/Rotation";

export const SPRITE_SPLATTER = 'img/character/splatter.png';
export const SPRITE_DART = 'img/item/weapon/dart.png';

export default class SpriteModel extends ImageModel {

	/**
	 * @type Rotation
	 */
	rotation;

	/**
	 * @type Vector2
	 */
	position;

	constructor(persistent = false) {
		super(persistent);

		this.size.set(1, 1);
		this.rotation = this.addProperty('rotation', new Rotation());
		this.position = this.addProperty('position', new Vector2());
	}

}
