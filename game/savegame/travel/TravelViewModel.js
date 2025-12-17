import ObjectModel from "wgge/core/model/ObjectModel";
import CanvasViewModel from "./CanvasViewModel";

export default class TravelViewModel extends ObjectModel {

	/**
	 * @type CanvasViewModel
	 */
	main;

	/**
	 * @type CanvasViewModel
	 */
	map;

	constructor() {
		super();

		this.main = this.addProperty('main', new CanvasViewModel());
		this.map = this.addProperty('map', new CanvasViewModel());

	}


}
