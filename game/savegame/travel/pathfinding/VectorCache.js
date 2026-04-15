import Dictionary from "wgge/core/Dictionary";

export default class VectorCache extends Dictionary {

	/**
	 *
	 * @param {Vector2} v
	 * @returns {CachedTile}
	 */
	get(v) {
		return super.get(v.toString(0));
	}

	/**
	 *
	 * @param {Vector2} v
	 * @param {CachedTile} value
	 */
	set(v, value) {
		super.set(v.toString(0), value);
	}

}
