import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import {
	HEIGHT_LEVEL_BEACH,
	HEIGHT_LEVEL_HILLS,
	HEIGHT_LEVEL_LAND,
	HEIGHT_LEVEL_MOUNTAINS,
	HEIGHT_LEVEL_WATER
} from "../../../map/tile/TileModel";
import NumberHelper from "wgge/core/helper/NumberHelper";

export default class TileHeightInfoRenderer extends DomRenderer {

	/**
	 * @type TileModel
	 */
	model;

	constructor(game, model, element) {
		super(game, model, element);

		this.model = model;

	}

	activateInternal() {
		this.name = this.addElement('div', 'level-name');
		this.name.innerHTML = TileHeightInfoRenderer.getHeightLevelName(this.model.heightLevel.get());

		this.value = this.addElement('div', 'value');
		this.value.innerHTML = NumberHelper.round(this.model.height.get(), 2);
	}

	static getHeightLevelName(heightLevel) {
		switch (heightLevel) {
			case HEIGHT_LEVEL_WATER:
				return "Water";
			case HEIGHT_LEVEL_BEACH:
				return "Beach";
			case HEIGHT_LEVEL_LAND:
				return "Land";
			case HEIGHT_LEVEL_HILLS:
				return "Hills";
			case HEIGHT_LEVEL_MOUNTAINS:
				return "Mountains"
			default:
				return `Height level ${heightLevel}`;
		}
	}

	deactivateInternal() {
		this.removeElement(this.name);
		this.name = null;
		this.removeElement(this.value);
		this.value = null;
	}

}
