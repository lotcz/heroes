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

	constructor(raceName) {
		super();

		this.factionNames = this.addProperty('factionNames', new NamesResource(raceName, 'factions'));
		this.locationNames = this.addProperty('locationNames', new NamesResource(raceName, 'locations'));
		this.maleNames = this.addProperty('maleNames', new NamesResource(raceName, 'males'));
		this.femaleNames = this.addProperty('femaleNames', new NamesResource(raceName, 'females'));
	}

	echoNamesPotential(names) {
		console.log(names.toString());
	}

	echoPotentials() {
		this.echoNamesPotential(this.factionNames);
		this.echoNamesPotential(this.locationNames);
		this.echoNamesPotential(this.maleNames);
		this.echoNamesPotential(this.femaleNames);
	}
}
