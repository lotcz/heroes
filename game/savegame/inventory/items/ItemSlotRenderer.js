import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import ItemRenderer from "./ItemRenderer";

export default class ItemSlotRenderer extends DomRenderer {

	/**
	 * @type ItemSlotModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.wrapper = null;
		this.img = null;

		this.save = this.game.saveGame.get();

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.item,
				(m) => new ItemRenderer(this.game, m, this.wrapper)
			)
		);
	}

	activateInternal() {
		this.wrapper = this.addElement('div', 'item-slot');
		this.wrapper.addEventListener('click', () => this.save.triggerEvent('select-slot', this.model));
	}

	deactivateInternal() {
		DOMHelper.destroyElement(this.wrapper);
	}

}
