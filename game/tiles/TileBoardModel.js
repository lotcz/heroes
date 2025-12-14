import ObjectModel from "wgge/core/model/ObjectModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import TileModel from "./tile/TileModel";
import IntValue from "wgge/core/model/value/IntValue";
import NumberHelper from "wgge/core/helper/NumberHelper";
import Vector2 from "wgge/core/model/vector/Vector2";

export default class TileBoardModel extends ObjectModel {

	/**
	 * @type ModelNodeCollection
	 */
	tiles;

	/**
	 * @type Vector2
	 */
	boardSize

	/**
	 * @type IntValue
	 */
	tileSize;

	constructor() {
		super();

		this.tiles = this.addProperty('tiles', new ModelNodeCollection(() => new TileModel(), false));
		this.tileSize = this.addProperty('tileSize', new IntValue(20));
		this.boardSize = this.addProperty('boardSize', new Vector2(20, 40));
	}

	randomize() {
		this.tiles.reset();
		for (let i = 0; i < this.boardSize.x; i++) {
			this.tiles.add(
				new TileModel(
					NumberHelper.round(NumberHelper.random(0, this.boardSize.x)),
					NumberHelper.round(NumberHelper.random(0, this.boardSize.y)),
					NumberHelper.round(NumberHelper.random(-10, 10))
				)
			);
		}
	}

}
