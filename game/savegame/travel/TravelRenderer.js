import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import TilesCanvasRenderer from "./map/TilesCanvasRenderer";
import MapRenderer from "./map/MapRenderer";
import TopMenuRenderer from "./top/TopMenuRenderer";
import ActionLogRenderer from "../journal/ActionLogRenderer";
import PartyInventoryRenderer from "../party/PartyInventoryRenderer";
import PartyPortraitsRenderer from "../party/PartyPortraitsRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import PartyCharacterSheetRenderer from "../party/members/PartyCharacterSheetRenderer";
import CursorItemRenderer from "./cursor/CursorItemRenderer";

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

		const topMenu = DOMHelper.createElement(this.container, 'div', 'top-menu');
		this.addChild(new TopMenuRenderer(this.game, this.model, topMenu));

		const row = DOMHelper.createElement(this.container, 'div', 'row stretch');

		const party = DOMHelper.createElement(row, 'div', 'party col');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.travel.selectedCharacter,
				(ch) => new PartyCharacterSheetRenderer(this.game, ch, party),
				() => new PartyPortraitsRenderer(this.game, this.model.party, party)
			)
		);

		const main = DOMHelper.createElement(row, 'div', 'main-view flex-1 container-host');
		main.addEventListener('wheel', (event) => this.model.triggerEvent('zoom', event.deltaY));
		this.mainCanvas = DOMHelper.createElement(main, 'canvas');
		this.addChild(new TilesCanvasRenderer(this.game, this.model.travel, this.mainCanvas));

		const menu = DOMHelper.createElement(row, 'div', 'menu col');

		const map = DOMHelper.createElement(menu, 'div', 'map');
		this.mapCanvas = DOMHelper.createElement(map, 'canvas', 'container');
		this.addChild(new MapRenderer(this.game, this.model.travel, this.mapCanvas));

		const inventory = DOMHelper.createElement(menu, 'div', 'inventory-wrapper');
		this.addChild(new PartyInventoryRenderer(this.game, this.model.party.inventory, inventory));

		const actionLog = DOMHelper.createElement(menu, 'div', 'action-log');
		this.addChild(new ActionLogRenderer(this.game, this.model.journal.actionLog, actionLog));

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.travel.selectedItemSlot,
				(s) => new CursorItemRenderer(this.game, s, this.container)
			)
		);
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
		this.mapCanvas = null;
		this.mainCanvas = null;
	}

}
