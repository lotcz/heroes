import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import ItemRenderer from "../items/ItemRenderer";

export default class ItemSlotRenderer extends DomRenderer {

	/**
	 * @type ItemSlotModel
	 */
	model;

	/**
	 * @type ?string
	 */
	extraClass;

	/**
	 * @type HeroesSaveGameModel
	 */
	save;

	constructor(game, model, dom, extraClass = null) {
		super(game, model, dom);

		this.model = model;
		this.extraClass = extraClass;
		this.wrapper = null;
		this.img = null;

		this.save = this.game.saveGame.get();

		// update slot availability
		this.addAutoEvent(
			this.save.cursorItem.item,
			'change',
			() => {
				const available = this.save.cursorItem.item.isSet()
					&& this.model.allowedType.isSet()
					&& this.model.acceptsItem(this.save.cursorItem.item.get());
				DOMHelper.toggleClass(this.wrapper, 'available', available);
			},
			true
		);

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
		if (this.extraClass) DOMHelper.addClass(this.wrapper, this.extraClass);
		this.wrapper.addEventListener('mousedown', () => this.save.triggerEvent('select-slot', this.model));
	}

	deactivateInternal() {
		DOMHelper.destroyElement(this.wrapper);
	}

}
