import ObjectModel from "wgge/core/model/ObjectModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import TileModel from "./tile/TileModel";
import IntValue from "wgge/core/model/value/IntValue";
import NumberHelper from "wgge/core/helper/NumberHelper";
import Vector2 from "wgge/core/model/vector/Vector2";
import {PerlinNoise} from "../generator/PerlinNoise";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class TileBoardModel extends ObjectModel {

	/**
	 * @type ModelNodeCollection
	 */
	tiles;

	/**
	 * @type Vector2
	 */
	boardSize;

	/**
	 * @type IntValue
	 */
	tileSize;

	/**
	 * @type Vector2
	 */
	hero;

	/**
	 * @type Vector2
	 */
	viewOffset;


	constructor() {
		super();

		this.tiles = this.addProperty('tiles', new ModelNodeCollection(() => new TileModel(), false));
		this.tileSize = this.addProperty('tileSize', new IntValue(64));
		this.boardSize = this.addProperty('boardSize', new Vector2(20, 20));
		this.hero = this.addProperty('hero', new Vector2(10, 10));
	}

	addTile(x, y, height, population) {
		this.tiles.add(new TileModel(x, y, height, population));
	}

	fillWith(heightFunc, populationFunc) {
		this.tiles.reset();
		for (let x = 0; x < this.boardSize.x; x++) {
			for (let y = 0; y < this.boardSize.y; y++) {
				this.addTile(x, y, heightFunc(x, y), populationFunc(x, y));
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
		const perlinH = new PerlinNoise();
		const perlinP = new PerlinNoise();
		this.fillWith(
			(x, y) => perlinH.fractalNoise(x/50, y/50, 8) * 10,
			(x, y) => perlinP.fractalNoise(x/50, y/50, 8)
		);
		const landTiles = this.tiles.filter((t) => t.height.get() > -0.5);
		const landTilesPopulated = landTiles.filter((t) => t.population.get() > 0);
		if (landTilesPopulated.length > 0) {
			for (let i = 0; i < 10; i++) {
				const tile = ArrayHelper.random(landTilesPopulated);
				tile.hasCity.set(true);
			}
		}
		const landTilesUnpopulated = landTiles.filter((t) => t.population.get() <= 0);
		if (landTilesPopulated.length > 0) {
			for (let i = 0; i < 10; i++) {
				const tile = ArrayHelper.random(landTilesUnpopulated);
				tile.hasMonster.set(true);
			}
		}
	}

}
