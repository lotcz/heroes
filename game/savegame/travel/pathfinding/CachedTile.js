export default class CachedTile {

	/**
	 * @type number|false
	 * False means blocked
	 */
	distance;

	/**
	 * @type null|CachedTile
	 * Null means start position
	 */
	cameFrom;

	/**
	 * @type TileModel
	 */
	tile;

	constructor(cameFrom, distance, tile) {
		this.distance = distance;
		this.cameFrom = cameFrom;
		this.tile = tile;
	}

	isBlocked() {
		return this.distance === false;
	}

}
