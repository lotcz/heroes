import ObjectModel from "wgge/core/model/ObjectModel";
import BiotopesResource from "./biotope/BiotopesResource";
import FactionStylesResource from "./factionStyle/FactionStylesResource";

export default class HeroesResources extends ObjectModel {

	/**
	 * @type BiotopesResource
	 */
	biotopes;

	/**
	 * @type FactionStylesResource
	 */
	factionStyles;

	constructor() {
		super(true);

		this.biotopes = this.addProperty('biotopes', new BiotopesResource());
		this.factionStyles = this.addProperty('factionStyles', new FactionStylesResource());

	}
}
