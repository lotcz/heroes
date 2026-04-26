import ObjectModel from "wgge/core/model/ObjectModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import FloatValue from "wgge/core/model/value/FloatValue";
import IntValue from "wgge/core/model/value/IntValue";
import NullableNode from "wgge/core/model/value/NullableNode";
import TileCornersModel from "./TileCornersModel";
import BoolValue from "wgge/core/model/value/BoolValue";
import TileRiverModel from "../../river/TileRiverModel";
import TileRiversModel from "../../river/TileRiversModel";
import NumberHelper from "wgge/core/helper/NumberHelper";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ItemModel from "../../items/ItemModel";

export const HEIGHT_LEVEL_WATER = 0;
export const HEIGHT_LEVEL_BEACH = 1;
export const HEIGHT_LEVEL_LAND = 2;
export const HEIGHT_LEVEL_HILLS = 3;
export const HEIGHT_LEVEL_MOUNTAINS = 4;

export const PRECIPITATION_LEVEL_DRY = 0;
export const PRECIPITATION_LEVEL_NORMAL = 1;
export const PRECIPITATION_LEVEL_MOIST = 2;
export const PRECIPITATION_LEVEL_WET = 3;

export const HEAT_LEVEL_COLD = 0;
export const HEAT_LEVEL_TEMPERATE = 1;
export const HEAT_LEVEL_HOT = 2;

export default class TileModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	position;

	/**
	 * @type BoolValue
	 */
	isBlocked;

	/**
	 * @type FloatValue
	 * [-1..1]
	 */
	height;

	/**
	 * @type IntValue
	 * [0..4]
	 */
	heightLevel;

	/**
	 * @type FloatValue
	 * [-1..1]
	 */
	precipitation;

	/**
	 * @type IntValue
	 * [0..3]
	 */
	precipitationLevel;

	/**
	 * @type FloatValue
	 * [-1..1]
	 */
	heat;

	/**
	 * @type IntValue
	 * [0..2]
	 */
	heatLevel;

	/**
	 * @type IntValue
	 */
	biotopeId;

	/**
	 * @type FloatValue
	 */
	discovered;

	/**
	 * @type IntValue
	 */
	decorId;

	/**
	 * @type NullableNode
	 */
	biotope;

	/**
	 * @type IntValue
	 */
	locationId;

	/**
	 * @type NullableNode<LocationModel>
	 */
	location;

	/**
	 * @type NullableNode
	 */
	decor;

	/**
	 * @type TileCornersModel
	 */
	corners;

	/**
	 * @type IntValue
	 */
	monsterGroupsId;

	/**
	 * @type NullableNode<UnitModel>
	 */
	monster;

	/**
	 * @type TileRiversModel
	 */
	rivers;

	/**
	 * @type NullableNode<RiverModel>
	 */
	river;

	/**
	 * @type ModelNodeCollection
	 */
	items;

	constructor() {
		super();

		this.position = this.addProperty('position', new Vector2());
		this.isBlocked = this.addProperty('isBlocked', new BoolValue(false));

		this.height = this.addProperty('height', new FloatValue(0));
		this.heightLevel = this.addProperty('heightLevel', new IntValue(HEIGHT_LEVEL_LAND, false));
		this.height.addOnChangeListener(() => this.updateHeightLevel(), true);

		this.precipitation = this.addProperty('precipitation', new FloatValue(0));
		this.precipitationLevel = this.addProperty('precipitationLevel', new IntValue(PRECIPITATION_LEVEL_NORMAL, false));
		this.precipitation.addOnChangeListener(() => this.updatePrecipitationLevel(), true);

		this.heat = this.addProperty('heat', new FloatValue(0));
		this.heatLevel = this.addProperty('heatLevel', new IntValue(HEAT_LEVEL_TEMPERATE, false));
		this.heat.addOnChangeListener(() => this.updateHeatLevel(), true);

		this.discovered = this.addProperty('discovered', new FloatValue(0));
		this.corners = this.addProperty('corners', new TileCornersModel());
		this.rivers = this.addProperty('rivers', new TileRiversModel());
		this.items = this.addProperty('items', new ModelNodeCollection(() => new ItemModel(), true));

		// links
		this.biotopeId = this.addProperty('biotopeId', new IntValue());
		this.decorId = this.addProperty('decorId', new IntValue());
		this.locationId = this.addProperty('locationId', new IntValue());

		// linked resources
		this.biotope = this.addProperty('biotope', new NullableNode(null, false));
		this.location = this.addProperty('location', new NullableNode(null, false));
		this.decor = this.addProperty('decor', new NullableNode(null, false));
		this.group = this.addProperty('group', new NullableNode(null, false));
		this.river = this.addProperty('river', new NullableNode(null, false));

	}

	isOcean() {
		return (this.heightLevel.get() <= HEIGHT_LEVEL_WATER);
	}

	hasRiverStream() {
		return !this.rivers.isEmpty();
	}

	isStream() {
		return this.rivers.isStream();
	}

	isRiver() {
		return this.rivers.isRiver();
	}

	isLake() {
		return this.rivers.isLake();
	}

	isWater() {
		return this.isOcean() || this.isRiver() || this.isLake();
	}

	isLand() {
		return !this.isWater();
	}

	isOccupied() {
		return this.group.isSet();
	}

	/**
	 * Use this to determine if tile is not blocked or occupied by a unit
	 */
	isFree() {
		return !(this.isOccupied() || this.isBlocked.get());
	}

	/**
	 * Use this to determine if a unit can move here
	 */
	canUnitMoveHere(unit) {
		if (!this.isFree()) return false;
		if (unit.isFlying()) return true;
		if (this.isWater() && !(unit.isSwimming() || unit.isRafting())) return false;
		if (this.isLand() && !unit.isWalking()) return false;
		return true;
	}

	canGroupMoveHere(group) {
		return !group.members.exists((u) => !this.canUnitMoveHere(u));
	}

	updateHeightLevel() {
		if (this.height.get() < -0.05) {
			this.heightLevel.set(HEIGHT_LEVEL_WATER);
			return;
		}
		if (this.height.get() <= 0) {
			this.heightLevel.set(HEIGHT_LEVEL_BEACH);
			return;
		}
		if (this.height.get() <= 0.15) {
			this.heightLevel.set(HEIGHT_LEVEL_LAND);
			return;
		}
		if (this.height.get() <= 0.25) {
			this.heightLevel.set(HEIGHT_LEVEL_HILLS);
			return;
		}
		this.heightLevel.set(HEIGHT_LEVEL_MOUNTAINS);
	}

	updatePrecipitationLevel() {
		if (this.precipitation.get() < -0.15) {
			this.precipitationLevel.set(PRECIPITATION_LEVEL_DRY);
			return;
		}
		if (this.precipitation.get() <= 0) {
			this.precipitationLevel.set(PRECIPITATION_LEVEL_NORMAL);
			return;
		}
		if (this.precipitation.get() <= 0.15) {
			this.precipitationLevel.set(PRECIPITATION_LEVEL_MOIST);
			return;
		}
		this.precipitationLevel.set(PRECIPITATION_LEVEL_WET);
	}

	updateHeatLevel() {
		if (this.heat.get() < -0.15) {
			this.heatLevel.set(HEAT_LEVEL_COLD);
			return;
		}
		if (this.heat.get() <= 0.15) {
			this.heatLevel.set(HEAT_LEVEL_TEMPERATE);
			return;
		}
		this.heatLevel.set(HEAT_LEVEL_HOT);
	}

	addRiver(riverId, target, strength) {
		const tileRiver = new TileRiverModel();
		tileRiver.riverId.set(riverId);
		tileRiver.targetPosition.set(target);
		tileRiver.strength.set(strength);
		tileRiver.jitter.set(new Vector2(NumberHelper.random(-0.2, 0.2), NumberHelper.random(-0.2, 0.2)));
		return this.rivers.add(tileRiver);
	}

	isNeighborOf(tile) {
		if (!tile) return false;
		return this.position.isNeighborPosition(tile.position);
	}

	isDirectNeighborOf(tile) {
		if (!tile) return false;
		return this.position.isDirectNeighborPosition(tile.position);
	}

	equalsTo(other) {
		if (!other) return false;
		return (this === other) || (this.position.equalsTo(other.position));
	}
}
