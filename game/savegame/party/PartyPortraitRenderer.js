import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";

export default class PartyPortraitRenderer extends DomRenderer {

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
		this.container = this.addElement('div', 'member');
		this.container.addEventListener('click', () => this.save.triggerEvent('select-character', this.model));
		this.addChild(new DirtyValueRenderer(this.game, this.model.name, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
