import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import TilesCanvasRenderer from "./tile/TilesCanvasRenderer";

export default class TileBoardRenderer extends DomRenderer {

	/**
	 * @type TileBoardModel
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
		this.canvas = null;
		this.container = null;
		DOMHelper.destroyElement(this.container);
	}

}
