import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import StatNameAndValueRenderer from "../../../resources/stats/rendering/StatNameAndValueRenderer";

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
		this.container = this.addElement('div', 'stats');
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.armor, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.meleeAccuracy, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.meleeDamage, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.rangedAccuracy, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.rangedDamage, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.fireResistance, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.poisonResistance, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
