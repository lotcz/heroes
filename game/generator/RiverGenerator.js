import {MIN_RIVER_LEVEL} from "../savegame/tile/TileModel";

export default class RiverGenerator {

	/**
	 * @type TilesModel
	 */
	tiles;

	constructor(tiles) {
		this.tiles = tiles;
	}

	isPeak(tile) {
		const neighbors = this.tiles.getNeighbors(tile.position);
		const height = tile.height.get();
		return !neighbors.some((t) => t.height.get() > height);
	}

	getAllRiverTiles(start, tiles) {
		const neighbors = this.tiles
			.getDirectNeighbors(start.position)
			.filter((n) => n.isRiver());
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

	createLake(start, water, strength) {
		if (start.isOcean()) return;
		if (strength < 1) return;

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
		if (lowest.isOcean()) return;

		lowest.riverStrength.increase(MIN_RIVER_LEVEL);
		lowest.biotopeId.set(water.id.get());
		lowest.biotope.set(water);

		if (this.tiles.isEdge(lowest.position)) return;

		if (lowest.height.get() < start.height.get()) {
			this.createRiver(lowest, water, strength + MIN_RIVER_LEVEL);
		} else {
			//console.log('Lake size', strength);
			this.createLake(lowest, water, strength - 1);
		}
	}

	createRiver(start, water, strength) {
		if (start.isOcean()) return;

		start.riverStrength.increase(strength);

		if (start.isRiver()) {
			start.biotopeId.set(water.id.get());
			start.biotope.set(water);
		}

		const neighbors = this.tiles.getDirectNeighbors(start.position);
		if (neighbors.length <= 0) return;

		const lowest = neighbors.sort((a, b) => a.height.get() - b.height.get())[0];

		if (this.tiles.isEdge(lowest.position)) return;

		if (lowest.height.get() < start.height.get()) {
			this.createRiver(lowest, water, strength + 1);
		} else {
			//console.log('Lake size', strength);
			this.createLake(lowest, water, strength);
		}
	}

	createRivers(quantity, waterBiotope) {
		const peaks = this.tiles.filter((t) => this.isPeak(t));
		peaks.sort((a, b) => b.height.get() - a.height.get());

		for (let i = 0, max = Math.min(quantity, peaks.length); i < max; i++) {
			this.createRiver(peaks[i], waterBiotope, 1);
		}
	}

}
