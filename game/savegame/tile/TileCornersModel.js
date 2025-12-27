import ObjectModel from "wgge/core/model/ObjectModel";
import TileCornerModel from "./TileCornerModel";

export default class TileCornersModel extends ObjectModel {

	/**
	 * @type TileCornerModel
	 */
	cornerA;

	/**
	 * @type TileCornerModel
	 */
	cornerB;

	/**
	 * @type TileCornerModel
	 */
	cornerC;

	/**
	 * @type TileCornerModel
	 */
	cornerD;

	constructor() {
		super();

		this.cornerA = this.addProperty('cornerA', new TileCornerModel());
		this.cornerB = this.addProperty('cornerB', new TileCornerModel());
		this.cornerC = this.addProperty('cornerC', new TileCornerModel());
		this.cornerD = this.addProperty('cornerD', new TileCornerModel());

	}

}
