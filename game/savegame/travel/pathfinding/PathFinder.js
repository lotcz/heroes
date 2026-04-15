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
		this.groupChangedHandler = () => {
			console.log('resetting');
			this.distanceCache.reset();
		}

		this.attachToGroup();
	}

	attachToGroup() {
		this.group.members.addEventListener('change', this.groupChangedHandler);
		this.group.position.addEventListener('change', this.groupChangedHandler);
		this.group.stats.addEventListener('change', this.groupChangedHandler);
	}

	detachFromGroup() {
		this.group.members.removeEventListener('change', this.groupChangedHandler);
		this.group.position.removeEventListener('change', this.groupChangedHandler);
		this.group.stats.removeEventListener('change', this.groupChangedHandler);
	}

	/**
	 *
	 * @param {CachedTile} comeFrom
	 * @param {TileModel} tile
	 * @returns {CachedTile}
	 */
	setCachedTile(comeFrom, tile) {
		const distance = comeFrom ? comeFrom.distance + 1 : 1;
		const isBlocked = !tile.canGroupMoveHere(this.group);
		const ct = new CachedTile(comeFrom, isBlocked ? false : distance, tile);
		this.distanceCache.set(tile.position, ct);
		return ct;
	}

	backtrack(cachedTile) {
		console.log('backtracking...');
		const path = [];
		let current = cachedTile;
		while (current.cameFrom) {
			path.unshift(current.tile);
			current = current.cameFrom;
		}
		return path;
	}

	findPath(startTile, endTile, maxDistance = 5) {
		if (startTile.equalsTo(endTile)) return [];
		if (!endTile.canGroupMoveHere(this.group)) return false;

		const startCachedTile = this.setCachedTile(null, startTile);
		const tilesForProcessing = [startCachedTile];

		let current = null;

		while (tilesForProcessing.length > 0) {
			current = tilesForProcessing.shift();
			//console.log('exploring', current.tile.position.toString(), current.isBlocked() ? 'blocked' : 'free');

			const unexploredNeighbors = this.tiles.getNeighbors(current.tile.position)
				.filter(
					(n) => {
						const cached = this.distanceCache.get(n.position);
						if (cached) {
							if (cached.isBlocked()) return false;
							return cached.distance > current.distance;
						}
						return true;
					}
				);

			for (let i = 0, max = unexploredNeighbors.length; i < max; i++) {
				const neighbor = this.setCachedTile(current, unexploredNeighbors[i]);
				console.log('neighbor', neighbor.tile.position.toString(), neighbor.distance, neighbor.isBlocked() ? 'blocked' : 'free');
				if (neighbor.tile.equalsTo(endTile)) return this.backtrack(neighbor);
				if (neighbor.distance <= maxDistance && !neighbor.isBlocked()) tilesForProcessing.push(neighbor);
			}
		}

		return null;
	}

}
