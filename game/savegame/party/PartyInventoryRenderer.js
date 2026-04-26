import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import PartyInventorySlotRenderer from "./PartyInventorySlotRenderer";
import CollectionRenderer from "wgge/core/renderer/generic/CollectionRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class PartyInventoryRenderer extends DomRenderer {

	/**
	 * @type PartyInventoryModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;

		this.addChild(
			new CollectionRenderer(game, this.model, (m) => new PartyInventorySlotRenderer(game, m, this.container))
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'inventory');
	}

	deactivateInternal() {
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
