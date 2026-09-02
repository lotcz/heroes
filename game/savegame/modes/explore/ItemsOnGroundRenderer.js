import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import InventoryRenderer from "../../inventory/InventoryRenderer";

export default class ItemsOnGroundRenderer extends DomRenderer {

	/**
	 * @type DynamicInventoryModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;
		this.savegame = this.game.saveGame.get();
	}

	activateInternal() {
		this.container = this.addElement('div', 'items-on-ground');
		const inventory = DOMHelper.createElement(this.container, 'div');
		this.addChild(new InventoryRenderer(this.game, this.model, inventory));
		const actions = DOMHelper.createElement(this.container, 'div');
		DOMHelper.createElement(
			actions,
			'button',
			'take-all',
			'Take all',
			() => this.savegame.triggerEvent('take-items-from-ground')
		);
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
