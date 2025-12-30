import ObjectModel from "wgge/core/model/ObjectModel";
import BiotopesResource from "./biotope/BiotopesResource";
import RacesResource from "./race/RacesResource";
import CornerMasksResource from "./cornerMask/CornerMasksResource";
import UnitTypesResource from "./unitType/UnitTypesResource";

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
	 * @type UnitTypesResource
	 */
	unitTypes;

	/**
	 * @type CornerMasksResource
	 */
	cornerMasks;

	constructor() {
		super(true);

		this.biotopes = this.addProperty('biotopes', new BiotopesResource());
		this.races = this.addProperty('races', new RacesResource());
		this.unitTypes = this.addProperty('unitTypes', new UnitTypesResource());
		this.cornerMasks = this.addProperty('cornerMasks', new CornerMasksResource());

	}
}

