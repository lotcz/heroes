import ObjectModel from "wgge/core/model/ObjectModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import FloatValue from "wgge/core/model/value/FloatValue";
import BoolValue from "wgge/core/model/value/BoolValue";
import IntValue from "wgge/core/model/value/IntValue";

export const HEIGHT_LEVEL_WATER = 0;
export const HEIGHT_LEVEL_BEACH = 1;
export const HEIGHT_LEVEL_LAND = 2;
export const HEIGHT_LEVEL_HILLS = 3;
export const HEIGHT_LEVEL_MOUNTAINS = 4;

export const PRECIPITATION_LEVEL_DRY = 0;
export const PRECIPITATION_LEVEL_NORMAL = 1;
export const PRECIPITATION_LEVEL_MOIST = 2;
export const PRECIPITATION_LEVEL_WET = 3;

export default class TileModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	position;

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
	 * [0..2]
	 */
	precipitationLevel;

	/**
	 * @type IntValue
	 */
	biotopeId;

	/**
	 * @type BoolValue
	 */
	hasCity;

	/**
	 * @type BoolValue
	 */
	hasMonster;

	/**
	 * @type FloatValue
	 */
	discovered;

	constructor() {
		super();

		this.position = this.addProperty('position', new Vector2());

		this.height = this.addProperty('height', new FloatValue());
		this.heightLevel = this.addProperty('heightLevel', new IntValue());
		this.height.addOnChangeListener(() => this.updateHeightLevel());
		this.updateHeightLevel();

		this.precipitation = this.addProperty('precipitation', new FloatValue());
		this.precipitationLevel = this.addProperty('precipitationLevel', new IntValue());
		this.precipitation.addOnChangeListener(() => this.updatePrecipitationLevel());
		this.updatePrecipitationLevel();

		this.biotopeId = this.addProperty('biotopeId', new IntValue());
		this.hasCity = this.addProperty('hasCity', new BoolValue(false));
		this.hasMonster = this.addProperty('hasMonster', new BoolValue(false));
		this.discovered = this.addProperty('discovered', new FloatValue(0));

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

}
