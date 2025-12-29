import ObjectModel from "wgge/core/model/ObjectModel";
import BiotopesResource from "./biotope/BiotopesResource";
import RacesResource from "./race/RacesResource";
import CornerMasksResource from "./cornerMask/CornerMasksResource";
import UnitsResource from "./unit/UnitsResource";

export default class HeroesResources extends ObjectModel {

	/**
	 * @type BiotopesResource
	 */
	biotopes;

	/**
	 * @type RacesResource
	 */
	races;

	/**
	 * @type UnitsResource
	 */
	units;

	/**
	 * @type CornerMasksResource
	 */
	cornerMasks;

	constructor() {
		super(true);

		this.biotopes = this.addProperty('biotopes', new BiotopesResource());
		this.races = this.addProperty('races', new RacesResource());
		this.units = this.addProperty('units', new UnitsResource());
		this.cornerMasks = this.addProperty('cornerMasks', new CornerMasksResource());

	}
}

