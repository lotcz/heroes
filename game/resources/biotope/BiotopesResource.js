import {BiotopeResource} from "./BiotopeResource";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import {DesertBiotope} from "./biotopes/DesertBiotope";
import {ForestBiotope} from "./biotopes/ForestBiotope";
import {GrasslandBiotope} from "./biotopes/GrasslandBiotope";
import {MountainsBiotope} from "./biotopes/MountainsBiotope";
import {BeachBiotope} from "./biotopes/BeachBiotope";
import {SwampBiotope} from "./biotopes/SwampBiotope";
import {ShoreBiotope} from "./biotopes/ShoreBiotope";
import {TundraBiotope} from "./biotopes/TundraBiotope";
import {WaterBiotope} from "./biotopes/WaterBiotope";
import {HillsBiotope} from "./biotopes/HillsBiotope";
import {RocksBiotope} from "./biotopes/RocksBiotope";
import {JungleBiotope} from "./biotopes/JungleBiotope";

export default class BiotopesResource extends ModelNodeTable {

	water;

	constructor() {
		super((id) => new BiotopeResource(id));

		// WATER

		this.water = this.add(new WaterBiotope());

		// BEACH

		this.add(new BeachBiotope());
		this.add(new SwampBiotope());
		this.add(new ShoreBiotope());

		// LAND

		this.add(new GrasslandBiotope());
		this.add(new ForestBiotope());
		this.add(new DesertBiotope());
		this.add(new JungleBiotope());

		// HILLS

		this.add(new TundraBiotope());
		this.add(new HillsBiotope());

		// MOUNTAINS

		this.add(new MountainsBiotope());
		this.add(new RocksBiotope());
	}

	findBestFitting(heightLevel, precipitationLevel, heatLevel) {
		const fitting = this.filter((b) => b.limits.validateLimits(heightLevel, precipitationLevel, heatLevel));
		if (fitting.length === 0) {
			console.log(`Not found any biotope for height: ${heightLevel} precipitation: ${precipitationLevel} and heat: ${heatLevel}`);
			return this.random();
		}
		if (fitting.length > 1) {
			console.log(`${fitting.length} biotopes found for height: ${heightLevel} precipitation: ${precipitationLevel} and heat: ${heatLevel}`);
			fitting.forEach((b) => console.log(b.name.get()));
			return ArrayHelper.random(fitting);
		}
		return fitting[0];
	}
}
