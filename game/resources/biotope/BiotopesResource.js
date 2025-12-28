import {BiotopeResource} from "./BiotopeResource";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import {PRECIPITATION_LEVEL_NORMAL} from "../../savegame/tile/TileModel";
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

export default class BiotopesResource extends ModelNodeTable {

	constructor() {
		super((id) => new BiotopeResource(id));

		// WATER

		this.add(new WaterBiotope());

		// BEACH

		this.add(new BeachBiotope());
		this.add(new SwampBiotope());
		this.add(new ShoreBiotope());

		// LAND

		this.add(new GrasslandBiotope());
		this.add(new ForestBiotope());
		this.add(new DesertBiotope());

		// HILLS

		this.add(new TundraBiotope());

		// MOUNTAINS

		this.add(new MountainsBiotope());
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
