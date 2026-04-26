import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import TilesCanvasRenderer from "./TilesCanvasRenderer";
import MapRenderer from "./MapRenderer";
import TopMenuRenderer from "./top/TopMenuRenderer";
import ActionLogRenderer from "../journal/ActionLogRenderer";

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
			[this.model.travel.mainView.canvasSize, this.model.travel.mapView.canvasSize],
			'change',
			() => {
				this.mainCanvas.width = this.model.travel.mainView.canvasSize.x;
				this.mainCanvas.height = this.model.travel.mainView.canvasSize.y;
				this.mapCanvas.width = this.model.travel.mapView.canvasSize.x;
				this.mapCanvas.height = this.model.travel.mapView.canvasSize.y;
			},
			true
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'travel container column');

		this.topMenu = DOMHelper.createElement(this.container, 'div', 'top-menu');
		this.addChild(new TopMenuRenderer(this.game, this.model, this.topMenu));

		this.row = DOMHelper.createElement(this.container, 'div', 'row stretch');
		this.main = DOMHelper.createElement(this.row, 'div', 'main-view flex-1 container-host');
		this.main.addEventListener('wheel', (event) => this.model.triggerEvent('zoom', event.deltaY));
		this.mainCanvas = DOMHelper.createElement(this.main, 'canvas');
		this.addChild(new TilesCanvasRenderer(this.game, this.model.travel, this.mainCanvas));

		this.menu = DOMHelper.createElement(this.row, 'div', 'menu col');
		this.map = DOMHelper.createElement(this.menu, 'div', 'map');
		this.mapCanvas = DOMHelper.createElement(this.map, 'canvas', 'container');
		this.addChild(new MapRenderer(this.game, this.model.travel, this.mapCanvas));

		this.actionLog = DOMHelper.createElement(this.menu, 'div', 'action-log');
		this.addChild(new ActionLogRenderer(this.game, this.game.saveGame.get().journal.actionLog, this.actionLog));

	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.mainCanvas = null;
		this.mapCanvas = null;
		this.container = null;
	}

}
