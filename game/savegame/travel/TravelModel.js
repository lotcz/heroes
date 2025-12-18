import Vector2 from "wgge/core/model/vector/Vector2";
import CanvasViewModel from "./CanvasViewModel";
import ObjectModel from "wgge/core/model/ObjectModel";
import TilesModel from "../tile/TilesModel";

export default class TravelModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	heroPosition;

	/**
	 * @type TilesModel
	 */
	tiles;

	/**
	 * @type CanvasViewModel
	 */
	mainView;

	/**
	 * @type CanvasViewModel
	 */
	mapView;

	constructor() {
		super();

		this.heroPosition = this.addProperty('hero', new Vector2());
		this.tiles = this.addProperty('tiles', new TilesModel());

		this.mainView = this.addProperty('main', new CanvasViewModel());
		this.mapView = this.addProperty('map', new CanvasViewModel());

		// hero moved
		this.heroPosition.addOnChangeListener(() => this.heroMoved());
	}

	getTile(x, y = null) {
		return this.tiles.getTile(x, y);
	}

	heroMoved() {
		for (let x = Math.floor(this.heroPosition.x - 4); x <= Math.ceil(this.heroPosition.x + 4); x++) {
			for (let y = Math.floor(this.heroPosition.y - 4); y <= Math.ceil(this.heroPosition.y + 4); y++) {
				const tile = this.getTile(x, y);
				if (tile && tile.discovered.get() < 1) {
					const distance = this.heroPosition.distanceTo(tile.position);
					if (distance < 2.5) {
						tile.discovered.set(1);
					}
				}
			}
		}

	}

}
