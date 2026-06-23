import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";

export default class StatNumericRenderer extends DomRenderer {

	/**
	 * @type StatModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
	}

	activateInternal() {
		this.container = this.addElement('div', 'stat-numeric');
		this.addChild(new DirtyValueRenderer(this.game, this.model.effectiveValue, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
	}

}
