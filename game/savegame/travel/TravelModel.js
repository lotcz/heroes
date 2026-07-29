import Vector2 from "wgge/core/model/vector/Vector2";
import CanvasViewModel from "./map/CanvasViewModel";
import ObjectModel from "wgge/core/model/ObjectModel";
import TilesModel from "./map/tile/TilesModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import NullableNode from "wgge/core/model/value/NullableNode";
import NearbyMonsterGroupsModel from "../units/monsters/NearbyMonsterGroupsModel";

const VIEW_DISTANCE = 2.5;

export default class TravelModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	partyPosition;

	/**
	 * @type TilesModel
	 */
	tiles;

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

		this.partyPosition = this.addProperty('partyPosition', new Vector2());
		this.partyPosition.addOnChangeListener(() => this.partyMoved(), true);

		this.tiles = this.addProperty('tiles', new TilesModel());
		this.visitingTile = this.addProperty('visitingTile', new NullableNode(null, false));
		this.visitingBiotope = this.addProperty('visitingBiotope', new NullableNode(null, false));
		this.visitingTile.addOnChangeListener(() => this.updateVisitingBiotope());

		this.visitingRiver = this.addProperty('visitingRiver', new NullableNode(null, false));
		this.visitingTile.addOnChangeListener(() => this.updateVisitingRiver());
		this.visibleTiles = this.addProperty('visibleTiles', new ModelNodeCollection(null, false));

		this.mainView = this.addProperty('main', new CanvasViewModel());
		this.mapView = this.addProperty('map', new CanvasViewModel());

		this.mainViewOffsetPx = this.addProperty('mainViewOffsetPx', new Vector2(0, 0, false));
		this.mainView.canvasCenter.addOnChangeListener(() => this.updateCenterOffsetPx());
		this.tiles.viewCenterOffsetPx.addOnChangeListener(() => this.updateCenterOffsetPx(), true);

		this.nearbyMonsters = this.addProperty('nearbyMonsters', new NearbyMonsterGroupsModel());

	}

	getTile(x, y = null) {
		return this.tiles.getTile(x, y);
	}

	updateVisitingTile() {
		this.visitingTile.set(this.getTile(this.partyPosition.round()));
	}

	partyMoved() {
		this.updateVisitingTile();
		this.updateVisibleTiles();
	}

	updateVisitingBiotope() {
		this.visitingBiotope.set(this.visitingTile.isSet() ? this.visitingTile.get().biotope.get() : null);
	}

	updateVisitingRiver() {
		this.visitingRiver.set(this.visitingTile.isSet() ? this.visitingTile.get().river.get() : null);
	}

	updateVisibleTiles() {
		this.visibleTiles.reset();
		for (let x = Math.floor(this.partyPosition.x - VIEW_DISTANCE); x <= Math.ceil(this.partyPosition.x + VIEW_DISTANCE); x++) {
			for (let y = Math.floor(this.partyPosition.y - VIEW_DISTANCE); y <= Math.ceil(this.partyPosition.y + VIEW_DISTANCE); y++) {
				const tile = this.getTile(x, y);
				if (tile) {
					const distance = this.partyPosition.distanceTo(tile.position);
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

	updateCenterOffsetPx() {
		this.mainViewOffsetPx.set(this.tiles.viewCenterOffsetPx.add(this.tiles.tileSizeHalf).sub(this.mainView.canvasCenter));
	}

}
