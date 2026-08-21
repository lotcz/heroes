import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import StatNumericRenderer from "../../../resources/stats/rendering/StatNumericRenderer";

export default class MeleeInfoRenderer extends DomRenderer {

	/**
	 * @type UnitStatsModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;
	}

	activateInternal() {
		this.container = this.addElement('div', 'melee-info col');
		const top = DOMHelper.createElement(this.container, 'div', 'center', 'Melee');
		const bottom = DOMHelper.createElement(this.container, 'div', 'bottom row');
		this.addChild(new StatNumericRenderer(this.game, this.model.meleeDamage, bottom));
		this.addChild(new StatNumericRenderer(this.game, this.model.meleeAccuracy, bottom, 'accuracy'));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
