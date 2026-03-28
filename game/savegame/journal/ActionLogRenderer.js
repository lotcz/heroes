import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class ActionLogRenderer extends DomRenderer {

	/**
	 * @type ActionLogModel
	 */
	model;

	constructor(game, model, element) {
		super(game, model, element);

		this.model = model;

	}

	activateInternal() {
		this.actions = this.addElement('div', 'action-log-actions');
	}

	deactivateInternal() {
		this.removeElement(this.actions);
	}

	renderInternal() {
		this.actions.innerHTML = '';
		let last = null;
		this.model.forEach(
			(a) => {
				if (!a.isEmpty()) {
					last = DOMHelper.createElement(this.actions, 'div', 'log-item', a.get());
				}
			}
		);
		if (last) last.scrollIntoView({behavior: 'smooth'});
	}

}
