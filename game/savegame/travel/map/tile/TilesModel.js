import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import TileModel from "./TileModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import IntValue from "wgge/core/model/value/IntValue";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class TilesModel extends ModelNodeCollection {

	tilesCache = [];

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
	 * View center offset
	 */
	viewCenterOffsetPx;

	constructor() {
		super(() => new TileModel());

		this.boardSize = this.addProperty('boardSize', new Vector2(100, 100));
		this.tileSizePx = this.addProperty('tileSizePx', new IntValue(128));

		// calculated tile size
		this.tileSize = this.addProperty('tileSize', new Vector2(0, 0, false));
		this.tileSizeHalf = this.addProperty('tileSizeHalf', new Vector2(0, 0, false));
		this.tileSizePx.addOnChangeListener(() => this.updateTileSize(), true);

		// calculated total board size
		this.boardTotalSizePx = this.addProperty('boardTotalSizePx', new Vector2(0, 0, false));
		this.boardSize.addOnChangeListener(() => this.updateBoardTotalSize());
		this.tileSizePx.addOnChangeListener(() => this.updateBoardTotalSize(), true);

		this.viewCenterTile = this.addProperty('viewCenterTile', new Vector2());

		// calculated pixel offset of view center
		this.viewCenterOffsetPx = this.addProperty('viewCenterOffsetPx', new Vector2(0, 0, false));
		this.viewCenterTile.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.tileSizePx.addOnChangeListener(() => this.updateCenterOffsetPx(), true);
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

	resetCache() {
		this.tilesCache = [];
	}

	reset() {
		super.reset();
		this.resetCache();
	}

	findTileSlow(x, y) {
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
			row[y] = tile || null;
			return tile;
		}
		return cached;
	}

	exists(x, y = null) {
		return (this.getTile(x, y) !== null);
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

	addTile(x, y, height, precipitation, heat) {
		const tile = new TileModel();
		tile.position.set(x, y);
		tile.height.set(height);
		tile.precipitation.set(precipitation);
		tile.heat.set(heat);
		this.setTile(x, y, tile);
	}

	isEdge(position) {
		return position.x === 0 || position.y === 0 || position.x === (this.boardSize.x - 1) || position.y === (this.boardSize.y - 1);
	}

	isFree(x, y) {
		const tile = this.getTile(x, y);
		if (!tile) return false;
		return tile.isFree();
	}

	isBlocked(x, y) {
		return !this.isFree(x, y);
	}

	/**
	 * Use this to determine if a group of units can move here
	 */
	canGroupMoveHere(x, y, group) {
		const tile = this.getTile(x, y);
		if (!tile) return false;
		return tile.canGroupMoveHere(group);
	}

	discoverAll() {
		this.forEach((t) => t.discovered.set(1));
	}

	getNeighbors(position, size = 1) {
		return position
			.round()
			.getNeighborPositions(size)
			.map((p) => this.getTile(p))
			.filter((t) => t !== null && t !== undefined);
	}

	getFreeNeighbors(position, size = 1) {
		return this.getNeighbors(position, size).filter((t) => t.isFree());
	}

	getGroupMovableNeighbors(position, group) {
		return this.getNeighbors(position).filter((t) => t.canGroupMoveHere(group));
	}

	getDirectNeighbors(position) {
		return position.getDirectNeighborPositions()
			.map((p) => this.getTile(p.round()))
			.filter((t) => t !== null && t !== undefined);
	}

	getFreeDirectNeighbors(position) {
		return this.getDirectNeighbors(position).filter((t) => t.isFree());
	}

	randomFree(water = null, allowDecor = true, allowRiver = true) {
		return ArrayHelper.random(
			this.filter(
				(t) => t.isFree()
					&& (water === null || (water === true && t.isWater()) || (water === false && t.isLand()))
					&& (allowDecor || t.decorId.isEmpty())
					&& (allowRiver || !t.hasRiverStream())
			)
		);
	}

}
