import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import NumberHelper from "wgge/core/helper/NumberHelper";

export default class ExpendableStatBarRenderer extends DomRenderer {

	/**
	 * @type ExpendableStatModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
	}

	activateInternal() {
		this.container = this.addElement('div', 'stat-bar');
		this.bar = DOMHelper.createElement(this.container, 'div', `stat-${this.model.definitionId.get()}`);
		this.updateBar();
	}

	deactivateInternal() {
		this.removeElement(this.container);
	}

	renderInternal() {
		this.updateBar();
	}

	updateBar() {
		const progress = this.model.currentValue.get() / this.model.effectiveValue.get();
		const width = NumberHelper.round(progress * 100, 2);
		this.bar.style.width = `${NumberHelper.between(0, 100, width)}%`;
	}

}
