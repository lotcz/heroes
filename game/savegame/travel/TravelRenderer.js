import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import TilesCanvasRenderer from "./TilesCanvasRenderer";
import MapRenderer from "./MapRenderer";
import TopMenuRenderer from "./TopMenuRenderer";

export default class TravelRenderer extends DomRenderer {

	/**
	 * @type TravelModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		// update canvas on resize
		this.addAutoEventMultiple(
			[this.model.mainView.canvasSize, this.model.mapView.canvasSize],
			'change',
			() => {
				this.mainCanvas.width = this.model.mainView.canvasSize.x;
				this.mainCanvas.height = this.model.mainView.canvasSize.y;
				this.mapCanvas.width = this.model.mapView.canvasSize.x;
				this.mapCanvas.height = this.model.mapView.canvasSize.y;
			},
			true
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'travel column');

		this.topMenu = DOMHelper.createElement(this.container, 'div', 'top-menu');
		this.addChild(new TopMenuRenderer(this.game, this.model, this.topMenu));

		this.row = DOMHelper.createElement(this.container, 'div', 'row stretch');
		this.main = DOMHelper.createElement(this.row, 'div', 'main-view flex-1 container-host');
		this.mainCanvas = DOMHelper.createElement(this.main, 'canvas');
		this.addChild(new TilesCanvasRenderer(this.game, this.model, this.mainCanvas));

		this.menu = DOMHelper.createElement(this.row, 'div', 'menu col');
		this.map = DOMHelper.createElement(this.menu, 'div', 'map');
		this.mapCanvas = DOMHelper.createElement(this.map, 'canvas', 'container');
		this.addChild(new MapRenderer(this.game, this.model, this.mapCanvas));

	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.mainCanvas = null;
		this.mapCanvas = null;
		this.container = null;
	}

}
