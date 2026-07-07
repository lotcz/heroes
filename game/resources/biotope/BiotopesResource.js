import {BiotopeResource} from "./BiotopeResource";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import {DesertBiotope} from "./biotopes/DesertBiotope";
import {ForestBiotope} from "./biotopes/ForestBiotope";
import {GrasslandBiotope} from "./biotopes/GrasslandBiotope";
import {PeaksBiotope} from "./biotopes/PeaksBiotope";
import {BeachBiotope} from "./biotopes/BeachBiotope";
import {SwampBiotope} from "./biotopes/SwampBiotope";
import {TundraBiotope} from "./biotopes/TundraBiotope";
import {OceanBiotope} from "./biotopes/OceanBiotope";
import {HillsBiotope} from "./biotopes/HillsBiotope";
import {RocksBiotope} from "./biotopes/RocksBiotope";
import {JungleBiotope} from "./biotopes/JungleBiotope";
import Dictionary from "wgge/core/Dictionary";
import {
	HEAT_LEVEL_COLD,
	HEAT_LEVEL_HOT,
	HEIGHT_LEVEL_BEACH,
	HEIGHT_LEVEL_HILLS,
	HEIGHT_LEVEL_LAND,
	HEIGHT_LEVEL_MOUNTAINS,
	HEIGHT_LEVEL_WATER,
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_MOIST,
	PRECIPITATION_LEVEL_NORMAL,
	PRECIPITATION_LEVEL_WET
} from "../../savegame/travel/map/tile/TileModel";
import {SnowBiotope} from "./biotopes/SnowBiotope";
import {RiverBiotope} from "./biotopes/RiverBiotope";
import {LakeBiotope} from "./biotopes/LakeBiotope";
import {CoralReefBiotope} from "./biotopes/CoralReefBiotope";

/**
 * See doc/biotopes.txt for biotopes breakdown
 */
export default class BiotopesResource extends ModelNodeTable {

	/**
	 * @type BiotopesResource
	 */
	ocean;

	constructor() {
		super((id) => new BiotopeResource(id));

		this.ocean = this.add(new OceanBiotope());
		this.coral = this.add(new CoralReefBiotope());
		this.river = this.add(new RiverBiotope());
		this.lake = this.add(new LakeBiotope());
		this.beach = this.add(new BeachBiotope());
		this.swamp = this.add(new SwampBiotope());
		this.grassland = this.add(new GrasslandBiotope());
		this.forest = this.add(new ForestBiotope());
		this.desert = this.add(new DesertBiotope());
		this.jungle = this.add(new JungleBiotope());
		this.tundra = this.add(new TundraBiotope());
		this.snow = this.add(new SnowBiotope());
		this.hills = this.add(new HillsBiotope());
		this.peaks = this.add(new PeaksBiotope());
		this.rocks = this.add(new RocksBiotope());

		// COLD
		const coldDrySelector = new BiotopeHeightSelector(this.tundra);
		coldDrySelector.add(HEIGHT_LEVEL_WATER, this.ocean);
		coldDrySelector.add(HEIGHT_LEVEL_MOUNTAINS, this.peaks);
		const coldNormalSelector = new BiotopeHeightSelector(this.snow);
		coldNormalSelector.add(HEIGHT_LEVEL_WATER, this.ocean);
		coldNormalSelector.add(HEIGHT_LEVEL_HILLS, this.tundra);
		coldNormalSelector.add(HEIGHT_LEVEL_MOUNTAINS, this.peaks);
		const coldMoistSelector = new BiotopeHeightSelector(this.snow);
		coldMoistSelector.add(HEIGHT_LEVEL_WATER, this.ocean);
		coldMoistSelector.add(HEIGHT_LEVEL_HILLS, this.peaks);
		coldMoistSelector.add(HEIGHT_LEVEL_MOUNTAINS, this.peaks);

		const coldSelector = new BiotopePrecipitationSelector(coldMoistSelector);
		coldSelector.add(PRECIPITATION_LEVEL_DRY, coldDrySelector);
		coldSelector.add(PRECIPITATION_LEVEL_NORMAL, coldNormalSelector);

		// TEMPERATE
		const temperateDrySelector = new BiotopeHeightSelector(this.coral);
		temperateDrySelector.add(HEIGHT_LEVEL_BEACH, this.beach);
		temperateDrySelector.add(HEIGHT_LEVEL_LAND, this.desert);
		temperateDrySelector.add(HEIGHT_LEVEL_HILLS, this.hills);
		temperateDrySelector.add(HEIGHT_LEVEL_MOUNTAINS, this.rocks);
		const temperateNormalSelector = new BiotopeHeightSelector(this.coral);
		temperateNormalSelector.add(HEIGHT_LEVEL_BEACH, this.beach);
		temperateNormalSelector.add(HEIGHT_LEVEL_LAND, this.grassland);
		temperateNormalSelector.add(HEIGHT_LEVEL_HILLS, this.hills);
		temperateNormalSelector.add(HEIGHT_LEVEL_MOUNTAINS, this.rocks);
		const temperateMoistSelector = new BiotopeHeightSelector(this.ocean);
		temperateMoistSelector.add(HEIGHT_LEVEL_BEACH, this.grassland);
		temperateMoistSelector.add(HEIGHT_LEVEL_LAND, this.forest);
		temperateMoistSelector.add(HEIGHT_LEVEL_HILLS, this.hills);
		temperateMoistSelector.add(HEIGHT_LEVEL_MOUNTAINS, this.peaks);
		const temperateWetSelector = new BiotopeHeightSelector(this.ocean);
		temperateWetSelector.add(HEIGHT_LEVEL_BEACH, this.swamp);
		temperateWetSelector.add(HEIGHT_LEVEL_LAND, this.forest);
		temperateWetSelector.add(HEIGHT_LEVEL_HILLS, this.hills);
		temperateWetSelector.add(HEIGHT_LEVEL_MOUNTAINS, this.peaks);

		const temperateSelector = new BiotopePrecipitationSelector(temperateNormalSelector);
		temperateSelector.add(PRECIPITATION_LEVEL_DRY, temperateDrySelector);
		temperateSelector.add(PRECIPITATION_LEVEL_MOIST, temperateMoistSelector);
		temperateSelector.add(PRECIPITATION_LEVEL_WET, temperateWetSelector);

		// HOT
		const hotDrySelector = new BiotopeHeightSelector(this.desert);
		hotDrySelector.add(HEIGHT_LEVEL_WATER, this.coral);
		hotDrySelector.add(HEIGHT_LEVEL_BEACH, this.beach);
		hotDrySelector.add(HEIGHT_LEVEL_MOUNTAINS, this.rocks);
		const hotNormalSelector = new BiotopeHeightSelector(this.desert);
		hotNormalSelector.add(HEIGHT_LEVEL_WATER, this.coral);
		hotNormalSelector.add(HEIGHT_LEVEL_HILLS, this.jungle);
		hotNormalSelector.add(HEIGHT_LEVEL_MOUNTAINS, this.rocks);
		const hotMoistSelector = new BiotopeHeightSelector(this.jungle);
		hotMoistSelector.add(HEIGHT_LEVEL_WATER, this.coral);
		hotMoistSelector.add(HEIGHT_LEVEL_BEACH, this.swamp);
		hotMoistSelector.add(HEIGHT_LEVEL_MOUNTAINS, this.rocks);
		const hotWetSelector = new BiotopeHeightSelector(this.swamp);
		hotWetSelector.add(HEIGHT_LEVEL_WATER, this.coral);
		hotWetSelector.add(HEIGHT_LEVEL_HILLS, this.hills);
		hotWetSelector.add(HEIGHT_LEVEL_MOUNTAINS, this.rocks);

		const hotSelector = new BiotopePrecipitationSelector(hotNormalSelector);
		hotSelector.add(PRECIPITATION_LEVEL_DRY, hotDrySelector);
		hotSelector.add(PRECIPITATION_LEVEL_MOIST, hotMoistSelector);
		hotSelector.add(PRECIPITATION_LEVEL_WET, hotWetSelector);

		// ALL

		this.selector = new BiotopeHeatSelector(temperateSelector);
		this.selector.add(HEAT_LEVEL_COLD, coldSelector);
		this.selector.add(HEAT_LEVEL_HOT, hotSelector);
	}

	findBestFitting(heatLevel, precipitationLevel, heightLevel) {
		const fitting = this.selector.selectBiotope(heatLevel, precipitationLevel, heightLevel);
		if (fitting === 0) {
			console.log(`Not found any biotope for height: ${heightLevel} precipitation: ${precipitationLevel} and heat: ${heatLevel}`);
			return this.random();
		}
		return fitting;
	}
}

class BiotopeHeightSelector extends Dictionary {

	/**
	 * @type BiotopesResource
	 */
	defaultBiotope;

	constructor(defaultBiotope) {
		super();
		this.defaultBiotope = defaultBiotope;
	}

	selectBiotope(height) {
		if (this.exists(height)) return this.get(height);
		return this.defaultBiotope;
	}
}

class BiotopeSuperSelector extends Dictionary {

	/**
	 * @type BiotopeHeightSelector|BiotopeSuperSelector
	 */
	defaultSelector;

	constructor(defaultSelector) {
		super();
		this.defaultSelector = defaultSelector;
	}

	selectBiotopeSelector(key) {
		const selector = this.get(key);
		if (selector) return selector;
		return this.defaultSelector;
	}
}

class BiotopePrecipitationSelector extends BiotopeSuperSelector {
	selectBiotope(precipitation, height) {
		const heightSelector = this.selectBiotopeSelector(precipitation);
		return heightSelector.selectBiotope(height);
	}
}

class BiotopeHeatSelector extends BiotopeSuperSelector {

	selectBiotope(heat, precipitation, height) {
		const precipitationSelector = this.selectBiotopeSelector(heat);
		return precipitationSelector.selectBiotope(precipitation, height);
	}
}
