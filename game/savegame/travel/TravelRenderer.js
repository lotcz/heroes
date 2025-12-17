import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import TilesCanvasRenderer from "./TilesCanvasRenderer";
import MapRenderer from "./MapRenderer";

export default class TravelRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		// update canvas on resize
		this.addAutoEventMultiple(
			[this.model.travelView.main.canvasSize, this.model.travelView.map.canvasSize],
			'change',
			() => {
				this.mainCanvas.width = this.model.travelView.main.canvasSize.x;
				this.mainCanvas.height = this.model.travelView.main.canvasSize.y;
				this.mapCanvas.width = this.model.travelView.map.canvasSize.x;
				this.mapCanvas.height = this.model.travelView.map.canvasSize.y;
			},
			true
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'travel container row stretch');

		this.main = DOMHelper.createElement(this.container, 'div', 'flex-1 container-host');
		this.mainCanvas = DOMHelper.createElement(this.main, 'canvas');
		this.addChild(new TilesCanvasRenderer(this.game, this.model, this.mainCanvas));

		this.menu = DOMHelper.createElement(this.container, 'div', 'menu col');
		this.map = DOMHelper.createElement(this.menu, 'div', 'container-host');
		this.mapCanvas = DOMHelper.createElement(this.map, 'canvas', 'container');
		this.addChild(new MapRenderer(this.game, this.model, this.mapCanvas));

	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.canvas = null;
		this.container = null;
	}

}
