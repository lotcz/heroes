import ObjectModel from "wgge/core/model/ObjectModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import {
	HEIGHT_LEVEL_LAND,
	HEIGHT_LEVEL_MOUNTAINS,
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_WET
} from "../../savegame/travel/TileModel";

export default class LevelLimits extends ObjectModel {

	/**
	 * @type Vector2
	 */
	heightLimit;

	/**
	 * @type Vector2
	 */
	precipitationLimit;

	constructor(
		minHeightLevel = HEIGHT_LEVEL_LAND,
		maxHeightLevel = HEIGHT_LEVEL_MOUNTAINS,
		minPrecipitationLevel = PRECIPITATION_LEVEL_DRY,
		maxPrecipitationLevel = PRECIPITATION_LEVEL_WET
	) {
		super();

		this.heightLimit = this.addProperty('heightLimit', new Vector2(minHeightLevel, maxHeightLevel));
		this.precipitationLimit = this.addProperty('precipitationLimit', new Vector2(minPrecipitationLevel, maxPrecipitationLevel));

	}

	validateHeight(heightLevel) {
		return heightLevel >= this.heightLimit.x && heightLevel <= this.heightLimit.y;
	}

	validatePrecipitation(precipitationLevel) {
		return precipitationLevel >= this.precipitationLimit.x && precipitationLevel <= this.precipitationLimit.y;
	}

	validateLimits(heightLevel, precipitationLevel) {
		return this.validateHeight(heightLevel) && this.validatePrecipitation(precipitationLevel);
	}

}
