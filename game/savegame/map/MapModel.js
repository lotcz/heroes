import CanvasViewModel from "../../basic/CanvasViewModel";
import ObjectModel from "wgge/core/model/ObjectModel";
import {PerlinNoiseModel} from "./PerlinNoiseModel";

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
	 * @type CanvasViewModel
	 */
	mapView;

	constructor() {
		super();

		this.heightNoise = this.addProperty('heightNoise', new PerlinNoiseModel());
		this.precipitationNoise = this.addProperty('precipitationNoise', new PerlinNoiseModel());
		this.temperatureNoise = this.addProperty('temperatureNoise', new PerlinNoiseModel());

		this.mapView = this.addProperty('map', new CanvasViewModel());

	}

	getTile(x, y = null) {
		return this.tiles.getTile(x, y);
	}

}
