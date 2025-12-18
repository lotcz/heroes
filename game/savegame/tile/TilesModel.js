import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import TileModel from "./TileModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import IntValue from "wgge/core/model/value/IntValue";

export default class TilesModel extends ModelNodeCollection {

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
		super(() => new TileModel());

		this.tilesCache = [];

		this.tileSizePx = this.addProperty('tileSizePx', new IntValue(128));
		this.boardSize = this.addProperty('boardSize', new Vector2(100, 100));

		// calculated total board size
		this.boardTotalSizePx = this.addProperty('boardTotalSizePx', new Vector2());
		this.boardSize.addOnChangeListener(() => this.updateBoardTotalSize());
		this.tileSizePx.addOnChangeListener(() => this.updateBoardTotalSize());
		this.updateBoardTotalSize();

		this.viewCenterTile = this.addProperty('viewCenterTile', new Vector2());

		// calculated pixel offset of view center
		this.viewCenterOffsetPx = this.addProperty('viewCenterOffsetPx', new Vector2());
		this.viewCenterTile.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.tileSizePx.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.updateCenterOffsetPx();
	}

	updateBoardTotalSize() {
		this.boardTotalSizePx.set(this.boardSize.multiply(this.tileSizePx.get()));
	}

	updateCenterOffsetPx() {
		this.viewCenterOffsetPx.set(this.viewCenterTile.multiply(this.tileSizePx.get()));
	}

	reset() {
		super.reset();
		this.tilesCache = [];
	}

	findTileSlow(x, y = null) {
		if (x < 0 || y < 0 || x >= this.boardSize.x || y >= this.boardSize.y) return null;
		return this.find((t) => t.position.x === x && t.position.y === y);
	}

	getTile(x, y = null) {
		if (y === null && x instanceof Vector2) {
			return this.getTile(x.x, x.y);
		}
		if (!this.tilesCache[x]) this.tilesCache[x] = [];
		const cached = this.tilesCache[x][y];
		if (cached === undefined) {
			const tile = this.findTileSlow(x, y);
			this.tilesCache[x][y] = tile;
			return tile;
		}
		return cached;
	}

	addTile(x, y, height, precipitation) {
		const tile = this.add();
		tile.position.set(x, y);
		tile.height.set(height);
		tile.precipitation.set(precipitation);
	}

	discoverAll() {
		this.forEach((t) => t.discovered.set(1));
	}

}
