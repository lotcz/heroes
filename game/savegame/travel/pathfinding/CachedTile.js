export default class CachedTile {

	/**
	 * @type number|false
	 * False means blocked
	 */
	distance;

	/**
	 * @type number
	 */
	penalty;

	/**
	 * @type null|CachedTile
	 * Null means start position
	 */
	cameFrom;

	/**
	 * @type TileModel
	 */
	tile;

	constructor(cameFrom, distance, penalty, tile) {
		this.distance = distance;
		this.penalty = penalty;
		this.cameFrom = cameFrom;
		this.tile = tile;
	}

	isBlocked() {
		return this.distance === false;
	}

	isBetterThan(otherCachedTile) {
		if (!otherCachedTile) return true;
		if (this.isBlocked()) return !otherCachedTile.isBlocked();
		if (otherCachedTile.isBlocked()) return true;
		if (otherCachedTile.distance === this.distance) return this.penalty < otherCachedTile.penalty;
		return this.distance < otherCachedTile.distance;
	}

}
