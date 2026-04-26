import TileRiverModel from "../savegame/river/TileRiverModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import RiverNames from "./RiverNames";
import {PRECIPITATION_LEVEL_DRY} from "../savegame/travel/tile/TileModel";

export default class RiverGenerator {

	/**
	 * @type HeroesSaveGameModel
	 */
	savegame;

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

	constructor(savegame, riverBiotope, lakeBiotope) {
		this.savegame = savegame;
		this.tiles = savegame.travel.tiles;
		this.riverBiotope = riverBiotope;
		this.lakeBiotope = lakeBiotope;

		this.riverNames = new RiverNames();
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

	addRiverTile(river, tile, targetPosition, strength) {
		tile.addRiver(river.id.get(), targetPosition, strength);
		if (tile.isRiver()) {
			tile.biotopeId.set(this.riverBiotope.id.get());
			tile.biotope.set(this.riverBiotope);
		}
	}

	addLakeTile(river, tile, targetPosition, strength) {
		if (targetPosition) tile.addRiver(river.id.get(), targetPosition, strength);
		tile.rivers.lake.set(true);
		tile.biotopeId.set(this.lakeBiotope.id.get());
		tile.biotope.set(this.lakeBiotope);
	}

	createLake(river, tile, from, strength) {
		if (tile.isOcean()) return;
		if (strength < 1) return;

		this.addLakeTile(river, tile, from ? from.position : null, strength);

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
			const neighbors = this.tiles.getDirectNeighbors(lowest.position).filter((n) => n.rivers.riverId.equalsTo(river.id.get()));
			if (neighbors.length > 0) {
				const neighbor = neighbors[0];
				this.addRiverTile(river, neighbor, lowest.position, strength);
				this.createRiver(river, lowest, neighbor, strength);
			}
		} else {
			this.createLake(river, lowest, tile, strength);
		}
	}

	createRiver(river, tile, from = null, strength = 1) {
		if (from) {
			this.addRiverTile(river, tile, from.position, strength);
		}

		// merged to lake or ocean
		if (tile.isOcean()) return;

		// merged with another stream
		if ((tile.isStream() || tile.isLake()) && !tile.rivers.riverId.equalsTo(river.id.get())) return;

		// flow out of map
		if (this.tiles.isEdge(tile.position)) {
			const out = ArrayHelper.random(tile.position.getNeighborPositions().filter((p) => !this.tiles.exists(p)));
			if (out) this.addRiverTile(river, tile, out, strength + 1);
			return;
		}

		const willBeRiver = TileRiverModel.isRiver(Math.max(tile.rivers.strength.get(), strength));
		const neighbors = willBeRiver
			? this.tiles.getDirectNeighbors(tile.position)
			: this.tiles.getNeighbors(tile.position);
		const otherNeighbors = neighbors.filter((n) => !n.rivers.riverId.equalsTo(river.id.get()));

		if (otherNeighbors.length <= 0) return;

		const lowest = otherNeighbors.sort((a, b) => a.height.get() - b.height.get())[0];

		if (lowest.height.get() < tile.height.get()) {
			this.addRiverTile(river, tile, lowest.position, strength);
			this.createRiver(river, lowest, tile, strength + 1);
		} else {
			this.addRiverTile(river, tile, lowest.position, strength);
			this.createLake(river, lowest, tile, strength);
		}
	}

	createRivers(quantity) {
		const peaks = this.tiles.filter((t) => this.isPeak(t) && t.precipitationLevel.get() > PRECIPITATION_LEVEL_DRY && !this.tiles.isEdge(t.position));
		peaks.sort((a, b) => b.height.get() - a.height.get());

		for (let i = 0, max = Math.min(quantity, peaks.length); i < max; i++) {
			let name = null;
			while (name === null || this.savegame.travel.rivers.nameExists(name)) {
				name = this.riverNames.getName();
			}
			const river = this.savegame.travel.rivers.addRiver(name);
			this.createRiver(river, peaks[i]);
		}
	}

}
