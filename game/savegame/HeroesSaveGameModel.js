import ObjectModel from "wgge/core/model/ObjectModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import TileModel from "./travel/TileModel";
import IntValue from "wgge/core/model/value/IntValue";
import Vector2 from "wgge/core/model/vector/Vector2";

export default class HeroesSaveGameModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	hero;

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
	tileSizePx;

	/**
	 * @type Vector2
	 */
	boardTotalSizePx;

	/**
	 * @type Vector2
	 */
	viewCenterTile;

	/**
	 * @type Vector2
	 */
	viewCenterOffsetPx;

	constructor() {
		super();

		this.hero = this.addProperty('hero', new Vector2());
		this.tiles = this.addProperty('tiles', new ModelNodeCollection(() => new TileModel(), false));
		this.tileSizePx = this.addProperty('tileSizePx', new IntValue(128));
		this.boardSize = this.addProperty('boardSize', new Vector2(200, 100));

		// calculated total board size
		this.boardTotalSizePx = this.addProperty('boardTotalSizePx', new Vector2());
		this.boardSize.addOnChangeListener(() => this.updateBoardTotalSize());
		this.tileSizePx.addOnChangeListener(() => this.updateBoardTotalSize());
		this.updateBoardTotalSize();

		this.viewCenterTile = this.addProperty('viewCenterTile', this.boardSize.multiply(0.5));

		// calculated pixel offset of view center
		this.viewCenterOffsetPx = this.addProperty('viewCenterOffsetPx', new Vector2());
		this.viewCenterTile.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.tileSizePx.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.updateCenterOffsetPx();

		// hero moved
		this.hero.addOnChangeListener(() => this.heroMoved());
	}

	updateBoardTotalSize() {
		this.boardTotalSizePx.set(this.boardSize.multiply(this.tileSizePx.get()));
	}

	updateCenterOffsetPx() {
		this.viewCenterOffsetPx.set(this.viewCenterTile.multiply(this.tileSizePx.get()));
	}

	/*
		TILES
	 */

	getTile(x, y) {
		const iX = Math.round(x);
		const iY = Math.round(y);
		if (iX < 0 || iY < 0 || iX >= this.boardSize.x || iY >= this.boardSize.y) return null;
		return this.tiles.find((t) => t.position.x === iX && t.position.y === iY);
	}

	addTile(x, y, height, population) {
		return this.tiles.add(new TileModel(x, y, height, population));
	}

	heroMoved() {
		for (let x = Math.floor(this.hero.x - 4); x <= Math.ceil(this.hero.x + 4); x++) {
			for (let y = Math.floor(this.hero.y - 4); y <= Math.ceil(this.hero.y + 4); y++) {
				const tile = this.getTile(x, y);
				if (tile && tile.discovered.get() < 1) {
					const distance = this.hero.distanceTo(tile.position);
					if (distance < 2) {
						tile.discovered.set(1);
					} else if (distance < 3) {
						tile.discovered.set(0.5);
					}
				}
			}
		}

	}

	clear() {
		this.tiles.forEach((t) => t.discovered.set(1));
	}

}
