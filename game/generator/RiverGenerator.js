import {MIN_RIVER_LEVEL} from "../savegame/tile/TileModel";

export default class RiverGenerator {

	/**
	 * @type TilesModel
	 */
	tiles;

	/**
	 * @type BiotopeModel
	 */
	riverBiotope;

	/**
	 * @type BiotopeModel
	 */
	lakeBiotope;

	constructor(tiles, riverBiotope, lakeBiotope) {
		this.tiles = tiles;
		this.riverBiotope = riverBiotope;
		this.lakeBiotope = lakeBiotope;
	}

	isPeak(tile) {
		const neighbors = this.tiles.getNeighbors(tile.position, 2);
		const height = tile.height.get();
		return !neighbors.some((t) => t.height.get() > height);
	}

	getAllRiverTiles(start, tiles) {
		const neighbors = this.tiles
			.getDirectNeighbors(start.position)
			.filter((n) => n.isRiver());
		neighbors.push(start);
		neighbors.forEach(
			(n) => {
				if (!tiles.has(n)) {
					tiles.add(n);
					const more = this.getAllRiverTiles(n, tiles);
					tiles = tiles.union(more);
				}
			}
		);
		return tiles;
	}

	createLake(start, strength) {
		if (start.isOcean()) return;
		if (strength < 1) return;

		start.riverStrength.set(Math.max(strength, MIN_RIVER_LEVEL));
		start.biotopeId.set(this.lakeBiotope.id.get());
		start.biotope.set(this.lakeBiotope);

		if (this.tiles.isEdge(start.position)) return;

		const riverTiles = this.getAllRiverTiles(start, new Set());
		//console.log('River size', riverTiles.size);

		const otherTiles = new Set();
		riverTiles.forEach(
			(t) => this.tiles
				.getDirectNeighbors(t.position)
				.filter((n) => !n.isRiver())
				.forEach((n) => otherTiles.add(n))
		);

		if (otherTiles.size === 0) return;

		const lowest = Array.from(otherTiles.values()).sort((a, b) => a.height.get() - b.height.get())[0];

		//if (lowest.isOcean()) return;

		if (lowest.height.get() < start.height.get()) {
			this.createRiver(lowest, 1);
		} else {
			this.createLake(lowest, strength);
		}
	}

	createRiver(start, strength = 1) {
		start.riverStrength.increase(strength);

		if (start.isRiver()) {
			start.biotopeId.set(this.riverBiotope.id.get());
			start.biotope.set(this.riverBiotope);
		}

		if (start.isOcean()) return;
		if (this.tiles.isEdge(start.position)) return;

		const neighbors = start.isRiver()
			? this.tiles.getDirectNeighbors(start.position)
			: this.tiles.getNeighbors(start.position);
		if (neighbors.length <= 0) return;

		const lowest = neighbors.sort((a, b) => a.height.get() - b.height.get())[0];


		if (lowest.height.get() < start.height.get()) {
			this.createRiver(lowest, strength + 1);
		} else {
			//console.log('Lake size', strength);
			this.createLake(lowest, strength);
		}
	}

	createRivers(quantity) {
		const peaks = this.tiles.filter((t) => this.isPeak(t));
		peaks.sort((a, b) => b.height.get() - a.height.get());

		for (let i = 0, max = Math.min(quantity, peaks.length); i < max; i++) {
			this.createRiver(peaks[i], 1);
		}
	}

}
