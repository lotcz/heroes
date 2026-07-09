import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import ItemSlotRenderer from "../../inventory/items/ItemSlotRenderer";

export default class UnitInventoryRenderer extends DomRenderer {

	/**
	 * @type UnitInventoryModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;

	}

	activateInternal() {
		this.container = this.addElement('div', 'inventory');
		this.addChild(new ItemSlotRenderer(this.game, this.model.leftHand, this.container));
		this.addChild(new ItemSlotRenderer(this.game, this.model.rightHand, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
