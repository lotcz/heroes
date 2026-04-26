import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class PartyInventorySlotRenderer extends DomRenderer {

	/**
	 * @type ItemSlotModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.wrapper = null;
		this.img = null;
	}

	activateInternal() {
		this.wrapper = this.addElement('div', 'item-slot');
	}

	renderInternal() {
		if (this.model.isEmpty()) {
			DOMHelper.destroyElement(this.img);
			this.img = null;
			return;
		}

		if (this.img === null) {
			this.img = DOMHelper.createElement(this.wrapper, 'img');
		}

		const item = this.model.item.get();
		this.img.src = item.itemDefinition.get().image.get();
	}

	deactivateInternal() {
		DOMHelper.destroyElement(this.wrapper);
	}

}
