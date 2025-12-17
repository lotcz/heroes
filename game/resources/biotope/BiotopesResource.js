import {BiotopeResource} from "./BiotopeResource";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import {
	HEIGHT_LEVEL_BEACH, HEIGHT_LEVEL_HILLS,
	HEIGHT_LEVEL_LAND, HEIGHT_LEVEL_MOUNTAINS,
	HEIGHT_LEVEL_WATER, PRECIPITATION_LEVEL_DRY, PRECIPITATION_LEVEL_MOIST,
	PRECIPITATION_LEVEL_NORMAL, PRECIPITATION_LEVEL_WET
} from "../../savegame/travel/TileModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class BiotopesResource extends ModelNodeTable {

	constructor() {
		super((id) => new BiotopeResource(id));

		// WATER

		this.addBiotope(
			'Water',
			'img/texture/water.jpg',
			HEIGHT_LEVEL_WATER
		);

		// BEACH

		this.addBiotope(
			'Beach',
			'img/texture/desert.jpg',
			HEIGHT_LEVEL_BEACH
		);

		this.addBiotope(
			'Shore',
			'img/texture/grass.jpg',
			HEIGHT_LEVEL_BEACH,
			PRECIPITATION_LEVEL_MOIST
		);

		this.addBiotope(
			'Swamp',
			'img/texture/swamp.jpg',
			HEIGHT_LEVEL_BEACH,
			PRECIPITATION_LEVEL_WET
		);

		// LAND

		this.addBiotope(
			'Grassland',
			'img/texture/grass.jpg',
			HEIGHT_LEVEL_LAND,
			PRECIPITATION_LEVEL_NORMAL
		);

		this.addBiotope(
			'Desert',
			'img/texture/desert.jpg',
			HEIGHT_LEVEL_LAND,
			PRECIPITATION_LEVEL_DRY
		);

		// HILLS

		this.addBiotope(
			'Tundra',
			'img/texture/paper.jpg',
			HEIGHT_LEVEL_HILLS,
			PRECIPITATION_LEVEL_NORMAL
		);
/*
		this.addBiotope(
			'Forest',
			'img/texture/grass.jpg',
			HEIGHT_LEVEL_HILLS,
			PRECIPITATION_LEVEL_WET
		);
*/
		// MOUNTAINS

		this.addBiotope(
			'Snow',
			'img/texture/snow.jpg',
			HEIGHT_LEVEL_MOUNTAINS
		);
	}

	addBiotope(name, texture, heightLevel = HEIGHT_LEVEL_LAND, precipitationLevel = PRECIPITATION_LEVEL_NORMAL) {
		const biotope = this.add();
		biotope.name.set(name);
		biotope.texture.set(texture);
		biotope.heightLevel.set(heightLevel);
		biotope.precipitationLevel.set(precipitationLevel);
	}

	findBestFitting(heightLevel, precipitationLevel) {
		const onLevel = this.filter((b) => b.heightLevel.equalsTo(heightLevel));
		if (onLevel.length === 0) return null;
		const onPrecipitation = onLevel.find((b) => b.precipitationLevel.equalsTo(precipitationLevel));
		if (onPrecipitation) return onPrecipitation;
		const onNormalPrecipitation = onLevel.find((b) => b.precipitationLevel.equalsTo(PRECIPITATION_LEVEL_NORMAL));
		if (onNormalPrecipitation) return onNormalPrecipitation;
		return ArrayHelper.random(onLevel);
	}
}
