import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import InventoryRenderer from "../../inventory/InventoryRenderer";

export default class SheetItemsRenderer extends DomRenderer {

	/**
	 * @type UnitModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;
		this.save = this.game.saveGame.get();
	}

	activateInternal() {
		this.container = this.addElement('div', 'sheet-items');
		this.addChild(new InventoryRenderer(this.game, this.model.inventory.items, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
