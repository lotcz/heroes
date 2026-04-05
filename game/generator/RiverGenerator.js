import TileRiverModel from "../savegame/tile/river/TileRiverModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

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
			.filter((n) => n.isRiver() || n.isLake());
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

	addRiverTile(tile, targetPosition, strength) {
		tile.addRiver(targetPosition, strength);
		if (tile.isRiver()) {
			tile.biotopeId.set(this.riverBiotope.id.get());
			tile.biotope.set(this.riverBiotope);
		}
	}

	addLakeTile(tile) {
		tile.rivers.reset();
		tile.rivers.lake.set(true);
		tile.biotopeId.set(this.lakeBiotope.id.get());
		tile.biotope.set(this.lakeBiotope);
	}

	createLake(tile, strength) {
		if (tile.isOcean()) return;
		if (strength < 1) return;

		this.addLakeTile(tile);

		if (this.tiles.isEdge(tile.position)) return;

		const riverTiles = this.getAllRiverTiles(tile, new Set());
		//console.log('River size', riverTiles.size);

		const otherTiles = new Set();
		riverTiles.forEach(
			(t) => this.tiles
				.getDirectNeighbors(t.position)
				.filter((n) => n.isLand())
				.forEach((n) => otherTiles.add(n))
		);

		if (otherTiles.size === 0) return;

		const lowest = Array.from(otherTiles.values()).sort((a, b) => a.height.get() - b.height.get())[0];

		if (lowest.height.get() < tile.height.get() && !lowest.isStream()) {
			this.createRiver(lowest, tile, 1);
		} else {
			this.createLake(lowest, strength);
		}
	}

	createRiver(tile, from = null, strength = 1) {
		if (from) {
			this.addRiverTile(tile, from.position, strength);
		}

		if (tile.isWater()) return;

		// flow out of map
		if (this.tiles.isEdge(tile.position)) {
			const out = ArrayHelper.random(tile.position.getNeighborPositions().filter((p) => !this.tiles.exists(p)));
			if (out) this.addRiverTile(tile, out, strength + 1);
			return;
		}

		const willBeRiver = TileRiverModel.isRiver(tile.rivers.strength.get() + strength);
		const neighbors = willBeRiver
			? this.tiles.getDirectNeighbors(tile.position)
			: this.tiles.getNeighbors(tile.position);
		if (neighbors.length <= 0) return;

		const lowest = neighbors.sort((a, b) => a.height.get() - b.height.get())[0];
		this.addRiverTile(tile, lowest.position, strength);

		if (lowest.height.get() < tile.height.get()) {
			this.createRiver(lowest, tile, strength + 1);
		} else {
			//this.addRiverTile(lowest, tile.position, strength);
			this.createLake(tile, strength);
		}
	}

	createRivers(quantity) {
		const peaks = this.tiles.filter((t) => this.isPeak(t));
		peaks.sort((a, b) => b.height.get() - a.height.get());

		for (let i = 0, max = Math.min(quantity, peaks.length); i < max; i++) {
			this.createRiver(peaks[i]);
		}
	}

}
