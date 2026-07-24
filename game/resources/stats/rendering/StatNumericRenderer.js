import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class StatNumericRenderer extends DomRenderer {

	/**
	 * @type StatModel
	 */
	model;

	/**
	 * @type ?string
	 */
	extraClass;

	constructor(game, model, dom, extraClass = null) {
		super(game, model, dom);

		this.model = model;
		this.extraClass = extraClass;
	}

	activateInternal() {
		this.container = this.addElement('div', 'stat-numeric');
		if (this.extraClass) DOMHelper.addClass(this.container, this.extraClass);
		this.addChild(new DirtyValueRenderer(this.game, this.model.effectiveValue, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
		this.container = null;
	}

}
