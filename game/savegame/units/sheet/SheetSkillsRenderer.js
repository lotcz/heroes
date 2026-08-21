import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import StatNameAndValueRenderer from "../../../resources/stats/rendering/StatNameAndValueRenderer";
import ExpendableStatBarRenderer from "../../../resources/stats/rendering/ExpendableStatBarRenderer";
import StatNumericRenderer from "../../../resources/stats/rendering/StatNumericRenderer";

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
		this.container = this.addElement('div', 'sheet-skills');

		const top = DOMHelper.createElement(this.container, 'div', 'row top');
		const level = DOMHelper.createElement(top, 'div', 'level');
		this.addChild(new ExpendableStatBarRenderer(this.game, this.model.stats.levelProgress, level));
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.level, level));

		const bottom = DOMHelper.createElement(this.container, 'div');
		DOMHelper.createElement(bottom, 'h4', null, 'Abilities');
		const abilities = DOMHelper.createElement(bottom, 'div', 'abilities mt-1');
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.strength, abilities));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.dexterity, abilities));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.wisdom, abilities));

		DOMHelper.createElement(bottom, 'h4', 'mt-2', 'Skills');
		const skills = DOMHelper.createElement(this.container, 'div', 'skills mt-1');
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.skillPoints, skills));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.meleeWeapons, skills));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.rangedWeapons, skills));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.evasion, skills));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.toughness, skills));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.fireMagic, skills));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.waterMagic, skills));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.natureMagic, skills));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.bloodMagic, skills));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
