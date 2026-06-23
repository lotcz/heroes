import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import ItemSlotRenderer from "../../items/ItemSlotRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class CursorItemRenderer extends DomRenderer {

	/**
	 * @type ItemSlotModel
	 */
	model;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;
		this.save = this.game.saveGame.get();
		this.wrapper = null;

		this.addAutoEvent(
			this.game.controls.mouseCoordinates,
			'change',
			() => this.updatePosition(),
			true
		);
	}

	activateInternal() {
		this.wrapper = this.addElement('div', 'cursor-item');
		this.addChild(new ItemSlotRenderer(this.game, this.model, this.wrapper));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.wrapper);
	}

	updatePosition() {
		this.wrapper.style.top = `${this.game.controls.mouseCoordinates.y}px`;
		this.wrapper.style.left = `${this.game.controls.mouseCoordinates.x}px`;
	}

}
