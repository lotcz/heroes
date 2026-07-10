import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class ItemRenderer extends DomRenderer {

	/**
	 * @type ItemModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.img = null;

		this.save = this.game.saveGame.get();
	}

	activateInternal() {
		this.img = DOMHelper.createElement(this.dom, 'img', 'item');
		const itemDef = this.model.itemDefinition.get();
		if (!itemDef) {
			console.error('Item definition empty', this.model.itemDefinitionId.get());
			return;
		}
		this.img.src = itemDef.image.get();
	}

	deactivateInternal() {
		DOMHelper.destroyElement(this.img);
	}

}
