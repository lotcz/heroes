import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import {
	PRECIPITATION_LEVEL_DRY,
	PRECIPITATION_LEVEL_MOIST,
	PRECIPITATION_LEVEL_NORMAL,
	PRECIPITATION_LEVEL_WET
} from "../map/tile/TileModel";
import NumberHelper from "wgge/core/helper/NumberHelper";

export default class TilePrecipitationInfoRenderer extends DomRenderer {

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
		this.name.innerHTML = TilePrecipitationInfoRenderer.getPrecipitationLevelName(this.model.precipitationLevel.get());

		this.value = this.addElement('div', 'value');
		this.value.innerHTML = NumberHelper.round(this.model.precipitation.get(), 2);
	}

	static getPrecipitationLevelName(precipitationLevel) {
		switch (precipitationLevel) {
			case PRECIPITATION_LEVEL_DRY:
				return "Dry";
			case PRECIPITATION_LEVEL_NORMAL:
				return "Normal";
			case PRECIPITATION_LEVEL_MOIST:
				return "Moist";
			case PRECIPITATION_LEVEL_WET:
				return "Wet";
			default:
				return `Precipitation level ${precipitationLevel}`;
		}
	}

	deactivateInternal() {
		this.removeElement(this.name);
		this.name = null;
		this.removeElement(this.value);
		this.value = null;
	}

}
