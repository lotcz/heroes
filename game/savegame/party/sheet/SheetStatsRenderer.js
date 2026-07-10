import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import StatNumericRenderer from "../../../resources/stats/rendering/StatNumericRenderer";

export default class SheetStatsRenderer extends DomRenderer {

	/**
	 * @type UnitModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;
	}

	activateInternal() {
		this.container = this.addElement('div', 'character-sheet row');
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.meleeDamage, this.container));
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.health, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
