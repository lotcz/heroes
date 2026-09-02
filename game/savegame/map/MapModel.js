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

	constructor() {
		super();

		this.heightNoise = this.addProperty('heightNoise', new PerlinNoiseModel());
		this.precipitationNoise = this.addProperty('precipitationNoise', new PerlinNoiseModel());
		this.temperatureNoise = this.addProperty('temperatureNoise', new PerlinNoiseModel());

	}

}
