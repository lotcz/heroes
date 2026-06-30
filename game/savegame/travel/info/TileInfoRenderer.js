import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import TileHeightInfoRenderer from "./TileHeightInfoRenderer";
import TileHeatInfoRenderer from "./TileHeatInfoRenderer";
import TilePrecipitationInfoRenderer from "./TilePrecipitationtInfoRenderer";

export default class TileInfoRenderer extends DomRenderer {

	/**
	 * @type TileModel
	 */
	model;

	constructor(game, model, element) {
		super(game, model, element);

		this.model = model;

	}

	activateInternal() {
		this.height = this.addElement('div', 'tile-height');
		this.addChild(new TileHeightInfoRenderer(this.game, this.model, this.height));

		this.heat = this.addElement('div', 'tile-heat');
		this.addChild(new TileHeatInfoRenderer(this.game, this.model, this.heat));

		this.precipitation = this.addElement('div', 'tile-precipitation');
		this.addChild(new TilePrecipitationInfoRenderer(this.game, this.model, this.precipitation));
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.height);
		this.height = null;
		this.removeElement(this.heat);
		this.heat = null;
		this.removeElement(this.precipitation);
		this.precipitation = null;
	}

}
