import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";

export default class TileCornerModel extends ObjectModel {

	/**
	 * @type IntValue
	 */
	tileMaskId;

	/**
	 * @type IntValue
	 */
	backgroundBiotopeId;

	constructor() {
		super();

		this.tileMaskId = this.addProperty('tileMaskId', new IntValue());
		this.backgroundBiotopeId = this.addProperty('backgroundBiotopeId', new IntValue());
	}

}
