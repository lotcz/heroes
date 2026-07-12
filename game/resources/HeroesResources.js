import ObjectModel from "wgge/core/model/ObjectModel";
import BiotopesResource from "./biotope/BiotopesResource";
import RacesResource from "./race/RacesResource";
import CornerMasksResource from "./cornerMask/CornerMasksResource";
import ItemDefinitionsResources from "./itemDefinition/ItemDefinitionsResources";
import StatDefinitionsResource from "./stats/definition/StatDefinitionsResource";

export default class HeroesResources extends ObjectModel {

	/**
	 * @type BiotopesResource
	 */
	biotopes;

	/**
	 * @type CornerMasksResource
	 */
	cornerMasks;

	/**
	 * @type ItemDefinitionsResources
	 */
	itemDefinitions;

	/**
	 * @type StatDefinitionsResource
	 */
	statDefinitions;

	/**
	 * @type RacesResource
	 */
	races;

	constructor() {
		super(true);

		this.biotopes = this.addProperty('biotopes', new BiotopesResource());
		this.cornerMasks = this.addProperty('cornerMasks', new CornerMasksResource());
		this.itemDefinitions = this.addProperty('itemDefinitions', new ItemDefinitionsResources());
		this.statDefinitions = this.addProperty('statDefinitions', new StatDefinitionsResource());
		this.races = this.addProperty('races', new RacesResource(this.itemDefinitions, this.biotopes));

	}
}

