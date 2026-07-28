import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import MainViewRenderer from "./map/MainViewRenderer";
import InfoBoxRenderer from "./info/InfoBoxRenderer";
import ActionLogRenderer from "../journal/ActionLogRenderer";
import ItemsOnGroundRenderer from "./ground/ItemsOnGroundRenderer";
import PartyPortraitsRenderer from "../units/party/PartyPortraitsRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import CharacterSheetRenderer from "../units/sheet/CharacterSheetRenderer";
import ConditionalNodeRenderer from "wgge/core/renderer/generic/ConditionalNodeRenderer";
import CursorInfoRenderer from "../cursor/info/CursorInfoRenderer";

export default class TravelRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.mainWrapper = null;
		this.mainCanvas = null;
		this.mapWrapper = null;
		this.mapCanvas = null;

		// read wrapper sizes on screen resize
		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => {
				this.model.travel.mainView.canvasSize.set(
					this.mainWrapper.clientWidth,
					this.mainWrapper.clientHeight
				);
				/*
				this.model.travel.mapView.canvasSize.set(
					this.mapWrapper.clientWidth,
					this.mapWrapper.clientHeight
				);
				 */
			},
			true
		);

		// update main canvas size
		this.addAutoEvent(
			this.model.travel.mainView.canvasSize,
			'change',
			() => {
				this.mainCanvas.width = this.model.travel.mainView.canvasSize.x;
				this.mainCanvas.height = this.model.travel.mainView.canvasSize.y;
			},
			true
		);

		// update map canvas size
		/*
		this.addAutoEvent(
			this.model.travel.mapView.canvasSize,
			'change',
			() => {
				this.mapCanvas.width = this.model.travel.mapView.canvasSize.x;
				this.mapCanvas.height = this.model.travel.mapView.canvasSize.y;
			},
			true
		);
		 */
	}

	activateInternal() {
		this.container = this.addElement('div', 'travel container row stretch');

		// SIDEBAR LEFT

		const sidebarLeft = DOMHelper.createElement(this.container, 'div', 'sidebar-left');
		const portraits = DOMHelper.createElement(sidebarLeft, 'div', 'party-portraits');
		this.addChild(new PartyPortraitsRenderer(this.game, this.model.party, portraits));

		// CHARACTER SHEET

		const characterSheet = DOMHelper.createElement(sidebarLeft, 'div');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.selectedCharacter,
				(ch) => new ConditionalNodeRenderer(
					this.game,
					this.model.characterSheetOpen,
					() => this.model.characterSheetOpen.get(),
					() => new CharacterSheetRenderer(this.game, ch, characterSheet)
				)
			)
		);

		// MAIN

		this.mainWrapper = DOMHelper.createElement(this.container, 'div', 'main-view flex-1 container-host');
		this.mainWrapper.addEventListener('wheel', (event) => this.model.triggerEvent('zoom', event.deltaY));
		this.mainCanvas = DOMHelper.createElement(this.mainWrapper, 'canvas', 'container');
		this.addChild(new MainViewRenderer(this.game, this.model.travel, this.mainCanvas));

		// ITEMS ON GROUND

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.travel.visitingTile,
				(m) => new ConditionalNodeRenderer(
					this.game,
					m.items.itemsCount,
					() => m.items.itemsCount.get() > 0,
					() => new ItemsOnGroundRenderer(this.game, m.items, this.container)
				)
			)
		);

		// SIDEBAR RIGHT

		const sidebarRight = DOMHelper.createElement(this.container, 'div', 'sidebar-right col');

		const infoBox = DOMHelper.createElement(sidebarRight, 'div', 'info-box');
		this.addChild(new InfoBoxRenderer(this.game, this.model, infoBox));

		/*
		this.mapWrapper = DOMHelper.createElement(sidebarRight, 'div', 'map container-host');
		this.mapCanvas = DOMHelper.createElement(this.mapWrapper, 'canvas', 'container');
		this.addChild(new MapRenderer(this.game, this.model.travel, this.mapCanvas));
		*/

		const cursorInfo = DOMHelper.createElement(sidebarRight, 'div', 'cursor-info');
		this.addChild(new CursorInfoRenderer(this.game, this.model, cursorInfo));

		const actionLog = DOMHelper.createElement(sidebarRight, 'div', 'action-log');
		this.addChild(new ActionLogRenderer(this.game, this.model.journal.actionLog, actionLog));

	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
		this.mainWrapper = null;
		this.mainCanvas = null;
		this.mapWrapper = null;
		this.mapCanvas = null;

	}

}
