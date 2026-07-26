import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import StatNameAndValueRenderer from "../../../resources/stats/rendering/StatNameAndValueRenderer";

export default class SheetSkillsRenderer extends DomRenderer {

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
		this.container = this.addElement('div', 'skills col');
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.meleeWeapons, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.rangedWeapons, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.evasion, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.toughness, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.fireMagic, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.waterMagic, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.natureMagic, this.container));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.bloodMagic, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
