import ObjectModel from "wgge/core/model/ObjectModel";
import BiotopesModel from "./biotope/BiotopesModel";

export default class HeroesResources extends ObjectModel {

	/**
	 * @type BiotopesModel
	 */
	biotopes;

	constructor() {
		super(true);

		this.biotopes = this.addProperty('biotopes', new BiotopesModel());

	}
}
