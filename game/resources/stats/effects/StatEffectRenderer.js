import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class StatEffectRenderer extends DomRenderer {

	/**
	 * @type StatEffectModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
	}

	activateInternal() {
		this.container = this.addElement('div', 'stat row');
		const statDef = this.game.resources.statDefinitions.get(this.model.definitionId.get());
		if (!statDef) {
			console.error("No stat definition found! Cannot render item effect info");
			return;
		}
		const name = DOMHelper.createElement(this.container, 'div', 'name', statDef.name.get());
		const value = DOMHelper.createElement(this.container, 'div', 'value', this.model.amount.get());
	}

	deactivateInternal() {
		this.removeElement(this.container);
	}

}
