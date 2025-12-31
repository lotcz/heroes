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
	tileSize;

	/**
	 * @type Vector2
	 */
	tileSizeHalf;

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

		this.boardSize = this.addProperty('boardSize', new Vector2(100, 100));
		this.tileSizePx = this.addProperty('tileSizePx', new IntValue(128));

		// calculated tile size
		this.tileSize = this.addProperty('tileSize', new Vector2());
		this.tileSizeHalf = this.addProperty('tileSizeHalf', new Vector2());
		this.tileSizePx.addOnChangeListener(() => this.updateTileSize());
		this.updateTileSize();

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

	updateTileSize() {
		this.tileSize.set(this.tileSizePx.get(), this.tileSizePx.get());
		this.tileSizeHalf.set(this.tileSize.multiply(0.5));
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
		let row = this.tilesCache[x];
		if (!row) row = this.tilesCache[x] = [];
		const cached = row[y];
		if (cached === undefined) {
			const tile = this.findTileSlow(x, y);
			row[y] = tile;
			return tile;
		}
		return cached;
	}

	setTile(x, y, tile) {
		const existing = this.getTile(x, y);
		if (existing) this.remove(existing);
		if (tile) {
			tile.position.set(x, y);
			this.add(tile);
			this.tilesCache[x][y] = tile;
		}
	}

	addTile(x, y, height, precipitation) {
		const tile = new TileModel();
		tile.position.set(x, y);
		tile.height.set(height);
		tile.precipitation.set(precipitation);
		this.setTile(x, y, tile);
	}

	discoverAll() {
		this.forEach((t) => t.discovered.set(1));
	}

	getNeighbors(position) {
		return position
			.getNeighborPositions()
			.map((p) => this.getTile(p))
			.filter((t) => t !== null);
	}

	getFreeNeighbors(position) {
		return this.getNeighbors(position)
			.filter((t) => t.isFree());
	}

}
