import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import TilesCanvasRenderer from "./TilesCanvasRenderer";

export default class TravelRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
	}

	activateInternal() {
		//this.game.assets.preload(this.model.getResourcesForPreload());
		this.container = this.addElement('div', 'container container-host');

		this.canvas = DOMHelper.createElement(this.container, 'canvas', 'container');
		this.addChild(new TilesCanvasRenderer(this.game, this.model, this.canvas));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.canvas = null;
		this.container = null;
	}

}
