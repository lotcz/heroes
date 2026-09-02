import ObjectModel from "wgge/core/model/ObjectModel";
import TileCornerModel from "./TileCornerModel";
import NullableNode from "wgge/core/model/value/NullableNode";

export default class TileCornersModel extends ObjectModel {

	/**
	 * @type NullableNode<TileCornerModel>
	 */
	cornerA;

	/**
	 * @type NullableNode<TileCornerModel>
	 */
	cornerB;

	/**
	 * @type NullableNode<TileCornerModel>
	 */
	cornerC;

	/**
	 * @type NullableNode<TileCornerModel>
	 */
	cornerD;

	constructor() {
		super();

		this.cornerA = this.addProperty('cornerA', new NullableNode(() => new TileCornerModel()));
		this.cornerB = this.addProperty('cornerB', new NullableNode(() => new TileCornerModel()));
		this.cornerC = this.addProperty('cornerC', new NullableNode(() => new TileCornerModel()));
		this.cornerD = this.addProperty('cornerD', new NullableNode(() => new TileCornerModel()));

	}

}
