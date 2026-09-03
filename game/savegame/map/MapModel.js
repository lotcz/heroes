import ObjectModel from "wgge/core/model/ObjectModel";
import {PerlinNoiseModel} from "./PerlinNoiseModel";
import EmbeddedCanvasViewModel from "../../basic/EmbeddedCanvasViewModel";
import TileModel from "./tile/TileModel";

export default class MapModel extends ObjectModel {

	/**
	 * @type PerlinNoiseModel
	 */
	heightNoise;

	/**
	 * @type PerlinNoiseModel
	 */
	precipitationNoise;

	/**
	 * @type PerlinNoiseModel
	 */
	temperatureNoise;

	/**
	 * @type EmbeddedCanvasViewModel
	 */
	mapView;

	constructor() {
		super();

		this.heightNoise = this.addProperty('heightNoise', new PerlinNoiseModel());
		this.precipitationNoise = this.addProperty('precipitationNoise', new PerlinNoiseModel());
		this.temperatureNoise = this.addProperty('temperatureNoise', new PerlinNoiseModel());

		this.mapView = this.addProperty('mapView', new EmbeddedCanvasViewModel());

	}

	getHeight(position) {
		return this.heightNoise.fractalNoise(position.x / 50, position.y / 50, 8);
	}

	getHeightLevel(position) {
		return TileModel.getHeightLevel(this.getHeight(position));
	}

	getPrecipitation(position) {
		return this.precipitationNoise.fractalNoise(position.x / 50, position.y / 50, 4);
	}

	getPrecipitationLevel(position) {
		return TileModel.getPrecipitationLevel(this.getPrecipitation(position));
	}

	getTemperature(position) {
		return this.temperatureNoise.fractalNoise(position.x / 50, position.y / 50, 4);
	}

	getHeatLevel(position) {
		return TileModel.getHeatLevel(this.getTemperature(position));
	}

}
