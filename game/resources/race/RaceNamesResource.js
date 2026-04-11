import NamesResource from "../basic/NamesResource";
import ObjectModel from "wgge/core/model/ObjectModel";

export default class RaceNamesResources extends ObjectModel {

	/**
	 * @type NamesResource
	 */
	factionNames;

	/**
	 * @type NamesResource
	 */
	locationNames;

	/**
	 * @type NamesResource
	 */
	maleNames;

	/**
	 * @type NamesResource
	 */
	femaleNames;

	constructor() {
		super();

		this.factionNames = this.addProperty('factionNames', new NamesResource());
		this.locationNames = this.addProperty('locationNames', new NamesResource());
		this.maleNames = this.addProperty('maleNames', new NamesResource());
		this.femaleNames = this.addProperty('femaleNames', new NamesResource());
	}
}
