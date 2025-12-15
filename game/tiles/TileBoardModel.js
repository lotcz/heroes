import ObjectModel from "wgge/core/model/ObjectModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import TileModel from "./tile/TileModel";
import IntValue from "wgge/core/model/value/IntValue";
import NumberHelper from "wgge/core/helper/NumberHelper";
import Vector2 from "wgge/core/model/vector/Vector2";
import {PerlinNoise} from "../generator/PerlinNoise";

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
		this.tileSize = this.addProperty('tileSize', new IntValue(10));
		this.boardSize = this.addProperty('boardSize', new Vector2(20, 40));
	}

	addTile(x, y, height) {
		this.tiles.add(new TileModel(x, y, height));
	}

	fillWith(fillerFunc) {
		this.tiles.reset();
		for (let x = 0; x < this.boardSize.x; x++) {
			for (let y = 0; y < this.boardSize.y; y++) {
				this.addTile(x, y, fillerFunc(x, y));
			}
		}
	}

	randomize() {
		this.fillWith((x, y) => NumberHelper.round(NumberHelper.random(-10, 10)));
	}

	perlin() {
		const perlin = new PerlinNoise();
		this.fillWith((x, y) => perlin.noise(x/50, y/50) * 10);
	}

	fractal() {
		const perlin = new PerlinNoise();
		this.fillWith((x, y) => perlin.fractalNoise(x/50, y/50, 4) * 10);
	}

}
