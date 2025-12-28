import ObjectModel from "wgge/core/model/ObjectModel";
import IntValue from "wgge/core/model/value/IntValue";

export default class TileCornerModel extends ObjectModel {

	/**
	 * @type IntValue
	 */
	maskId;

	/**
	 * @type IntValue
	 */
	backgroundBiotopeId;

	constructor() {
		super();

		this.maskId = this.addProperty('maskId', new IntValue());
		this.backgroundBiotopeId = this.addProperty('backgroundBiotopeId', new IntValue());
	}

}
