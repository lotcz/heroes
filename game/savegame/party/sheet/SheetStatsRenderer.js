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
		this.container = this.addElement('div', 'stats row');
		const left = DOMHelper.createElement(this.container, 'div', 'col');
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.meleeAccuracy, left));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.meleeDamage, left));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.health, left));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.fireResistance, left));

		const right = DOMHelper.createElement(this.container, 'div', 'col');
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.rangedAccuracy, right));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.rangedDamage, right));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.armor, right));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.poisonResistance, right));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
