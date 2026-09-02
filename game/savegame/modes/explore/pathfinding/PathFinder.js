import VectorCache from "./VectorCache";
import CachedTile from "./CachedTile";

export default class PathFinder {

	/**
	 * @type GroupModel
	 * @desc start position, when it changes, all distances must be reset
	 */
	group;

	/**
	 * @type TilesModel
	 */
	tiles;

	/**
	 * @type VectorCache
	 * @desc Caches distance from start, -1 means blocked
	 */
	distanceCache = new VectorCache();

	constructor(group, tiles) {
		this.group = group;
		this.tiles = tiles;
	}

	reset() {
		this.distanceCache.reset();
	}

	/**
	 *
	 * @param {CachedTile} comeFrom
	 * @param {TileModel} tile
	 * @returns {CachedTile}
	 */
	createCachedTile(comeFrom, tile) {
		const distance = comeFrom ? comeFrom.distance + 1 : 0;
		const isBlocked = !tile.canGroupMoveHere(this.group);
		let penalty = 0;
		if (comeFrom) {
			penalty += comeFrom.penalty;
			if (!comeFrom.tile.isDirectNeighborOf(tile)) penalty += 1;
			if (comeFrom.tile.isWater() !== tile.isWater()) penalty += 2;
		}
		return new CachedTile(comeFrom, isBlocked ? false : distance, penalty, tile);
	}

	backtrack(cachedTile) {
		const path = [];
		let current = cachedTile;
		while (current.cameFrom) {
			path.unshift(current.tile);
			current = current.cameFrom;
		}
		return path;
	}

	findPath(startTile, endTile, maxDistance = 12) {
		if (startTile.equalsTo(endTile)) return [];
		if (!endTile.canGroupMoveHere(this.group)) return [];

		const existing = this.distanceCache.get(endTile.position);
		if (existing) {
			return this.backtrack(existing);
		} else {
			this.reset();
		}

		const startCachedTile = this.createCachedTile(null, startTile);
		this.distanceCache.set(startTile.position, startCachedTile);
		const tilesForProcessing = [startCachedTile];

		let current = null;
		let best = null;

		while (tilesForProcessing.length > 0) {
			current = tilesForProcessing.shift();
			const neighbors = this.tiles.getNeighbors(current.tile.position);

			for (let i = 0, max = neighbors.length; i < max; i++) {
				const neighbor = neighbors[i];
				const cached = this.distanceCache.get(neighbor.position);
				if (cached && cached.isBlocked()) continue;
				const candidate = this.createCachedTile(current, neighbor);
				if (candidate.distance > maxDistance) continue;
				if (best && best.isBetterThan(candidate)) continue;
				if (neighbor.equalsTo(endTile)) {
					if (candidate.isBetterThan(best)) {
						best = candidate;
					}
				} else if (candidate.isBetterThan(cached)) {
					this.distanceCache.set(neighbor.position, candidate);
					if (!candidate.isBlocked()) tilesForProcessing.push(candidate);
				}
			}
		}

		return best ? this.backtrack(best) : [];
	}

}
