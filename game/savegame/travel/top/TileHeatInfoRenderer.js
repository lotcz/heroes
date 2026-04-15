import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import {HEAT_LEVEL_COLD, HEAT_LEVEL_HOT, HEAT_LEVEL_TEMPERATE} from "../tile/TileModel";
import NumberHelper from "wgge/core/helper/NumberHelper";

export default class TileHeatInfoRenderer extends DomRenderer {

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
		this.name.innerHTML = TileHeatInfoRenderer.getHeatLevelName(this.model.heatLevel.get());

		this.value = this.addElement('div', 'value');
		this.value.innerHTML = NumberHelper.round(this.model.heat.get(), 2);
	}

	static getHeatLevelName(heatLevel) {
		switch (heatLevel) {
			case HEAT_LEVEL_COLD:
				return "Cold";
			case HEAT_LEVEL_TEMPERATE:
				return "Temperate";
			case HEAT_LEVEL_HOT:
				return "Hot";
			default:
				return `Heat level ${heatLevel}`;
		}
	}

	deactivateInternal() {
		this.removeElement(this.name);
		this.name = null;
		this.removeElement(this.value);
		this.value = null;
	}

}
