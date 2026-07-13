import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import SheetEquipRenderer from "./SheetEquipRenderer";
import SheetItemsRenderer from "./SheetItemsRenderer";
import SheetStatsRenderer from "./SheetStatsRenderer";
import SheetSkillsRenderer from "./SheetSkillsRenderer";

export default class CharacterSheetRenderer extends DomRenderer {

	/**
	 * @type UnitModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;
		this.save = this.game.saveGame.get();

	}

	activateInternal() {
		this.container = this.addElement('div', 'character-sheet row');

		const left = DOMHelper.createElement(this.container, 'div', 'col');
		const items = DOMHelper.createElement(left, 'div');
		this.addChild(new SheetItemsRenderer(this.game, this.model, items));
		const skills = DOMHelper.createElement(left, 'div');
		this.addChild(new SheetSkillsRenderer(this.game, this.model, skills));

		const right = DOMHelper.createElement(this.container, 'div', 'col');
		const equip = DOMHelper.createElement(right, 'div');
		this.addChild(new SheetEquipRenderer(this.game, this.model, equip));

		const stats = DOMHelper.createElement(right, 'div');
		this.addChild(new SheetStatsRenderer(this.game, this.model, stats));

		const back = DOMHelper.createElement(
			right,
			'button',
			'back',
			'Back',
			() => this.save.triggerEvent('close-sheet')
		);
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
