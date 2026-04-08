import Vector2 from "wgge/core/model/vector/Vector2";
import CanvasViewModel from "./CanvasViewModel";
import ObjectModel from "wgge/core/model/ObjectModel";
import TilesModel from "../tile/TilesModel";
import MonstersModel from "../monster/MonstersModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import NullableNode from "wgge/core/model/value/NullableNode";
import UnitStatsModel from "../../resources/stats/UnitStatsModel";

const VIEW_DISTANCE = 2.5;

export default class TravelModel extends ObjectModel {

	/**
	 * @type TilesModel
	 */
	tiles;

	/**
	 * @type MonstersModel
	 */
	monsters;

	/**
	 * @type Vector2
	 */
	heroPosition;

	/**
	 * @type NullableNode<TileModel>
	 */
	visitingTile;

	/**
	 * @type NullableNode<BiotopeModel>
	 */
	visitingBiotope;

	/**
	 * @type ModelNodeCollection<TileModel>
	 */
	visibleTiles;

	/**
	 * @type UnitStatsModel
	 */
	partyStats;

	/**
	 * @type CanvasViewModel
	 */
	mainView;

	/**
	 * @type Vector2
	 * Calculated offset of main view corner
	 */
	mainViewOffsetPx;

	/**
	 * @type CanvasViewModel
	 */
	mapView;

	constructor() {
		super();

		this.tiles = this.addProperty('tiles', new TilesModel());
		this.monsters = this.addProperty('monsters', new MonstersModel());

		this.heroPosition = this.addProperty('heroPosition', new Vector2());
		this.visitingTile = this.addProperty('visitingTile', new NullableNode(null, false));
		this.visitingTile.addOnChangeListener(() => this.updateVisitingBiotope());

		this.visitingBiotope = this.addProperty('visitingBiotope', new NullableNode(null, false));
		this.visibleTiles = this.addProperty('visibleTiles', new ModelNodeCollection(null, false));
		this.heroPosition.addOnChangeListener(() => this.heroMoved(), true); // hero moved

		// todo: move to party model
		this.partyStats = this.addProperty('partyStats', new UnitStatsModel());

		this.mainView = this.addProperty('main', new CanvasViewModel());
		this.mapView = this.addProperty('map', new CanvasViewModel());

		this.mainViewOffsetPx = this.addProperty('mainViewOffsetPx', new Vector2(0, 0, false));
		this.mainView.canvasCenter.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.tiles.viewCenterOffsetPx.addOnChangeListener(() => this.updateCenterOffsetPx(), true);

	}

	getTile(x, y = null) {
		return this.tiles.getTile(x, y);
	}

	updateVisitingTile() {
		this.visitingTile.set(this.getTile(this.heroPosition.round()));
	}

	updateVisitingBiotope() {
		this.visitingBiotope.set(this.visitingTile.isSet() ? this.visitingTile.get().biotope.get() : null);
	}

	updateVisibleTiles() {
		this.visibleTiles.reset();
		for (let x = Math.floor(this.heroPosition.x - VIEW_DISTANCE); x <= Math.ceil(this.heroPosition.x + VIEW_DISTANCE); x++) {
			for (let y = Math.floor(this.heroPosition.y - VIEW_DISTANCE); y <= Math.ceil(this.heroPosition.y + VIEW_DISTANCE); y++) {
				const tile = this.getTile(x, y);
				if (tile) {
					const distance = this.heroPosition.distanceTo(tile.position);
					if (distance < VIEW_DISTANCE) {
						this.visibleTiles.add(tile);
						tile.discovered.set(true);
					}
				}
			}
		}
	}

	isTileInView(tile) {
		if (!tile) return false;
		return this.visibleTiles.exists((vt) => tile.equalsTo(vt));
	}

	isPositionInView(x, y = null) {
		return this.isTileInView(this.getTile(x, y));
	}

	heroMoved() {
		this.updateVisitingTile();
		this.updateVisibleTiles();
	}

	updateCenterOffsetPx() {
		this.mainViewOffsetPx.set(this.tiles.viewCenterOffsetPx.add(this.tiles.tileSizeHalf).sub(this.mainView.canvasCenter));
	}

}
