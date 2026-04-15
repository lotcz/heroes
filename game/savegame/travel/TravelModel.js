import Vector2 from "wgge/core/model/vector/Vector2";
import CanvasViewModel from "./CanvasViewModel";
import ObjectModel from "wgge/core/model/ObjectModel";
import TilesModel from "./tile/TilesModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import NullableNode from "wgge/core/model/value/NullableNode";
import MonsterGroupsModel from "../monsters/MonsterGroupsModel";
import PartyModel from "../party/PartyModel";

const VIEW_DISTANCE = 2.5;

export default class TravelModel extends ObjectModel {

	/**
	 * @type TilesModel
	 */
	tiles;

	/**
	 * @type MonsterGroupsModel
	 */
	monsters;

	/**
	 * @type PartyModel
	 */
	party;

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

		this.tiles = this.addProperty('tiles', new TilesModel());
		this.party = this.addProperty('party', new PartyModel());
		this.monsters = this.addProperty('monsters', new MonsterGroupsModel());

		this.visitingTile = this.addProperty('visitingTile', new NullableNode(null, false));

		this.visitingBiotope = this.addProperty('visitingBiotope', new NullableNode(null, false));
		this.visitingTile.addOnChangeListener(() => this.updateVisitingBiotope());

		this.visitingRiver = this.addProperty('visitingRiver', new NullableNode(null, false));
		this.visitingTile.addOnChangeListener(() => this.updateVisitingRiver());

		this.visibleTiles = this.addProperty('visibleTiles', new ModelNodeCollection(null, false));
		this.party.position.addOnChangeListener(() => this.partyMoved(), true);

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
		this.visitingTile.set(this.getTile(this.party.position.round()));
	}

	updateVisitingBiotope() {
		this.visitingBiotope.set(this.visitingTile.isSet() ? this.visitingTile.get().biotope.get() : null);
	}

	updateVisitingRiver() {
		this.visitingRiver.set(this.visitingTile.isSet() ? this.visitingTile.get().river.get() : null);
	}

	updateVisibleTiles() {
		this.visibleTiles.reset();
		for (let x = Math.floor(this.party.position.x - VIEW_DISTANCE); x <= Math.ceil(this.party.position.x + VIEW_DISTANCE); x++) {
			for (let y = Math.floor(this.party.position.y - VIEW_DISTANCE); y <= Math.ceil(this.party.position.y + VIEW_DISTANCE); y++) {
				const tile = this.getTile(x, y);
				if (tile) {
					const distance = this.party.position.distanceTo(tile.position);
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

	partyMoved() {
		this.updateVisitingTile();
		this.updateVisibleTiles();
	}

	updateCenterOffsetPx() {
		this.mainViewOffsetPx.set(this.tiles.viewCenterOffsetPx.add(this.tiles.tileSizeHalf).sub(this.mainView.canvasCenter));
	}

}
