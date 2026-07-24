import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import NumberHelper from "wgge/core/helper/NumberHelper";

export default class ExpendableStatBarRenderer extends DomRenderer {

	/**
	 * @type ExpendableStatModel
	 */
	model;

	/**
	 * @type boolean
	 */
	vertical = true;

	constructor(game, model, dom, vertical = true) {
		super(game, model, dom);

		this.model = model;
		this.vertical = vertical;
	}

	activateInternal() {
		this.container = this.addElement('div', 'stat-bar');
		DOMHelper.addClass(this.container, this.vertical ? 'vertical' : 'horizontal');
		this.bar = DOMHelper.createElement(this.container, 'div', `stat-${this.model.definitionId.get()}`);
		this.updateBar();
	}

	deactivateInternal() {
		this.removeElement(this.container);
		this.container = null;
		this.bar = null;
	}

	renderInternal() {
		this.updateBar();
	}

	updateBar() {
		const progress = this.model.currentValue.get() / this.model.effectiveValue.get();
		const percent = NumberHelper.round(progress * 100, 2);
		const value = `${NumberHelper.between(0, 100, percent)}%`;
		if (this.vertical) {
			this.bar.style.height = value;
		} else {
			this.bar.style.width = value;
		}
	}

}
