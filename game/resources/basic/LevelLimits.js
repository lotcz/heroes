import ObjectModel from "wgge/core/model/ObjectModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import {
	HEAT_LEVEL_COLD,
	HEAT_LEVEL_HOT,
	HEIGHT_LEVEL_LAND,
	HEIGHT_LEVEL_MOUNTAINS,
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_WET
} from "../../savegame/tile/TileModel";

export default class LevelLimits extends ObjectModel {

	/**
	 * @type Vector2
	 */
	heightLimit;

	/**
	 * @type Vector2
	 */
	precipitationLimit;

	/**
	 * @type Vector2
	 */
	heatLimit;

	constructor(
		minHeightLevel = HEIGHT_LEVEL_LAND,
		maxHeightLevel = HEIGHT_LEVEL_MOUNTAINS,
		minPrecipitationLevel = PRECIPITATION_LEVEL_DRY,
		maxPrecipitationLevel = PRECIPITATION_LEVEL_WET,
		minHeatLevel = HEAT_LEVEL_COLD,
		maxHeatLevel = HEAT_LEVEL_HOT
	) {
		super();

		this.heightLimit = this.addProperty('heightLimit', new Vector2(minHeightLevel, maxHeightLevel));
		this.precipitationLimit = this.addProperty('precipitationLimit', new Vector2(minPrecipitationLevel, maxPrecipitationLevel));
		this.heatLimit = this.addProperty('heatLimit', new Vector2(minHeatLevel, maxHeatLevel));

	}

	validateHeight(heightLevel) {
		return heightLevel >= this.heightLimit.x && heightLevel <= this.heightLimit.y;
	}

	validatePrecipitation(precipitationLevel) {
		return precipitationLevel >= this.precipitationLimit.x && precipitationLevel <= this.precipitationLimit.y;
	}

	validateHeat(heatLevel) {
		return heatLevel >= this.heatLimit.x && heatLevel <= this.heatLimit.y;
	}

	validateLimits(heightLevel, precipitationLevel, heatLevel) {
		return this.validateHeight(heightLevel) && this.validatePrecipitation(precipitationLevel) && this.validateHeat(heatLevel);
	}

}
