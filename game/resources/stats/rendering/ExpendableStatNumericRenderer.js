import DomRenderer from "wgge/core/renderer/dom/DomRenderer";

export default class ExpendableStatNumericRenderer extends DomRenderer {

	/**
	 * @type ExpendableStatModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
	}

	activateInternal() {
		this.container = this.addElement('div', 'stat-numeric');
		this.updateBar();
	}

	deactivateInternal() {
		this.removeElement(this.container);
		this.container = null;
	}

	renderInternal() {
		this.updateBar();
	}

	updateBar() {
		this.container.innerText = `${this.model.currentValue.get()}/${this.model.effectiveValue.get()}`;
	}

}
