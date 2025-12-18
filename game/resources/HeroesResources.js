import ObjectModel from "wgge/core/model/ObjectModel";
import BiotopesResource from "./biotope/BiotopesResource";
import RacesResource from "./race/RacesResource";

export default class HeroesResources extends ObjectModel {

	/**
	 * @type BiotopesResource
	 */
	biotopes;

	/**
	 * @type RacesResource
	 */
	races;

	constructor() {
		super(true);

		this.biotopes = this.addProperty('biotopes', new BiotopesResource());
		this.races = this.addProperty('races', new RacesResource());

	}
}
