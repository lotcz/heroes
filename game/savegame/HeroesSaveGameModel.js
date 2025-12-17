import ObjectModel from "wgge/core/model/ObjectModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import TileModel from "./travel/TileModel";
import IntValue from "wgge/core/model/value/IntValue";
import Vector2 from "wgge/core/model/vector/Vector2";
import TravelViewModel from "./travel/TravelViewModel";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import LocationModel from "./location/LocationModel";

export default class HeroesSaveGameModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	hero;

	/**
	 * @type ModelNodeCollection
	 */
	tiles;

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
	boardTotalSizePx;

	/**
	 * @type Vector2
	 */
	viewCenterTile;

	/**
	 * @type Vector2
	 */
	viewCenterOffsetPx;

	/**
	 * @type TravelViewModel
	 */
	travelView;

	/**
	 * @type ModelNodeTable<LocationModel>
	 */
	locations;

	constructor() {
		super(true);

		this.travelView = this.addProperty('travelView', new TravelViewModel());

		this.hero = this.addProperty('hero', new Vector2());
		this.tiles = this.addProperty('tiles', new ModelNodeCollection(() => new TileModel()));
		this.tileSizePx = this.addProperty('tileSizePx', new IntValue(128));
		this.boardSize = this.addProperty('boardSize', new Vector2(100, 100));

		// calculated total board size
		this.boardTotalSizePx = this.addProperty('boardTotalSizePx', new Vector2());
		this.boardSize.addOnChangeListener(() => this.updateBoardTotalSize());
		this.tileSizePx.addOnChangeListener(() => this.updateBoardTotalSize());
		this.updateBoardTotalSize();

		this.viewCenterTile = this.addProperty('viewCenterTile', new Vector2());

		// calculated pixel offset of view center
		this.viewCenterOffsetPx = this.addProperty('viewCenterOffsetPx', new Vector2());
		this.viewCenterTile.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.tileSizePx.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.updateCenterOffsetPx();

		this.locations = this.addProperty('locations', new ModelNodeTable((id) => new LocationModel(id)));

		// hero moved
		this.hero.addOnChangeListener(() => this.heroMoved());
	}

	updateBoardTotalSize() {
		this.boardTotalSizePx.set(this.boardSize.multiply(this.tileSizePx.get()));
	}

	updateCenterOffsetPx() {
		this.viewCenterOffsetPx.set(this.viewCenterTile.multiply(this.tileSizePx.get()));
	}

	/*
		TILES
	 */

	getTile(x, y = null) {
		if (y === null && x instanceof Vector2) {
			return this.getTile(x.x, x.y);
		}
		const iX = Math.round(x);
		const iY = Math.round(y);
		if (iX < 0 || iY < 0 || iX >= this.boardSize.x || iY >= this.boardSize.y) return null;
		return this.tiles.find((t) => t.position.x === iX && t.position.y === iY);
	}

	addTile(x, y, height, precipitation) {
		const tile = this.tiles.add();
		tile.position.set(x, y);
		tile.height.set(height);
		tile.precipitation.set(precipitation);
	}

	heroMoved() {
		for (let x = Math.floor(this.hero.x - 4); x <= Math.ceil(this.hero.x + 4); x++) {
			for (let y = Math.floor(this.hero.y - 4); y <= Math.ceil(this.hero.y + 4); y++) {
				const tile = this.getTile(x, y);
				if (tile && tile.discovered.get() < 1) {
					const distance = this.hero.distanceTo(tile.position);
					if (distance < 2.5) {
						tile.discovered.set(1);
					}
				}
			}
		}

	}

	clear() {
		this.tiles.forEach((t) => t.discovered.set(1));
	}

}
