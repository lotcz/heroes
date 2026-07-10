import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import SheetEquipRenderer from "./SheetEquipRenderer";
import SheetItemsRenderer from "./SheetItemsRenderer";
import SheetStatsRenderer from "./SheetStatsRenderer";

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

		const right = DOMHelper.createElement(this.container, 'div', 'col');
		const equip = DOMHelper.createElement(right, 'div');
		this.addChild(new SheetEquipRenderer(this.game, this.model.inventory, equip));

		const stats = DOMHelper.createElement(right, 'div');
		this.addChild(new SheetStatsRenderer(this.game, this.model, stats));

		const back = DOMHelper.createElement(
			stats,
			'button',
			'back',
			'Back',
			() => this.save.triggerEvent('select-character', null)
		);
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
