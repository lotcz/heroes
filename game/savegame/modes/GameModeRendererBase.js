import DOMHelper from "wgge/core/helper/DOMHelper";
import ActionLogRenderer from "../journal/ActionLogRenderer";
import ItemsOnGroundRenderer from "./explore/ItemsOnGroundRenderer";
import PartyPortraitsRenderer from "../units/party/PartyPortraitsRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import CharacterSheetRenderer from "../units/sheet/CharacterSheetRenderer";
import ConditionalNodeRenderer from "wgge/core/renderer/generic/ConditionalNodeRenderer";
import DomContainerRenderer from "wgge/core/renderer/dom/DomContainerRenderer";

export default class GameModeRendererBase extends DomContainerRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	mainWrapper;

	mainCanvas;

	sidebarLeftWrapper;

	sidebarRightWrapper;

	infoBoxWrapper;

	constructor(game, model, dom) {
		super(game, model, dom, 'game-mode container row stretch');

		this.model = model;

		this.mainWrapper = null;
		this.mainCanvas = null;

		// read wrapper sizes on screen resize
		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => {
				this.model.mainView.canvasSize.set(
					this.mainWrapper.clientWidth,
					this.mainWrapper.clientHeight
				);
			},
			true
		);

		// update main canvas size
		this.addAutoEvent(
			this.model.mainView.canvasSize,
			'change',
			() => {
				this.mainCanvas.width = this.model.mainView.canvasSize.x;
				this.mainCanvas.height = this.model.mainView.canvasSize.y;
			},
			true
		);

	}

	activateInternal() {
		super.activateInternal();

		// SIDEBAR LEFT

		this.sidebarLeftWrapper = DOMHelper.createElement(this.container, 'div', 'sidebar-left');
		const portraits = DOMHelper.createElement(this.sidebarLeftWrapper, 'div', 'party-portraits');
		this.addChild(new PartyPortraitsRenderer(this.game, this.model.party, portraits));

		// CHARACTER SHEET

		const characterSheet = DOMHelper.createElement(this.sidebarLeftWrapper, 'div');
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

		this.sidebarRightWrapper = DOMHelper.createElement(this.container, 'div', 'sidebar-right col');

		this.infoBoxWrapper = DOMHelper.createElement(this.sidebarRightWrapper, 'div', 'info-box');

		const actionLog = DOMHelper.createElement(this.sidebarRightWrapper, 'div', 'action-log');
		this.addChild(new ActionLogRenderer(this.game, this.model.journal.actionLog, actionLog));

	}

	deactivateInternal() {
		super.deactivateInternal();
		this.resetChildren();
		this.mainWrapper = null;
		this.mainCanvas = null;
		this.sidebarLeftWrapper = null;
		this.sidebarRightWrapper = null;
	}

}
