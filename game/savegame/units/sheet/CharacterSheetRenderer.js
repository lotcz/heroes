import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import SheetEquipRenderer from "./SheetEquipRenderer";
import SheetItemsRenderer from "./SheetItemsRenderer";
import SheetStatsRenderer from "./SheetStatsRenderer";
import SheetSkillsRenderer from "./SheetSkillsRenderer";
import SheetMiddleRenderer from "./SheetMiddleRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";

export default class CharacterSheetRenderer extends DomRenderer {

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
		this.container = this.addElement('div', 'character-sheet col');

		const top = DOMHelper.createElement(this.container, 'h3', 'center');
		const name = DOMHelper.createElement(top, 'span');
		this.addChild(new DirtyValueRenderer(this.game, this.model.name, name));
		DOMHelper.createElement(top, 'span', 'small', ' of ');
		const tribe = DOMHelper.createElement(top, 'span');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.faction,
				(f) => new DirtyValueRenderer(this.game, f.name, tribe)
			)
		);

		const bottom = DOMHelper.createElement(this.container, 'div', 'bottom row');

		const left = DOMHelper.createElement(bottom, 'div', 'col');
		const items = DOMHelper.createElement(left, 'div');
		this.addChild(new SheetItemsRenderer(this.game, this.model, items));

		const middle = DOMHelper.createElement(bottom, 'div');
		this.addChild(new SheetMiddleRenderer(this.game, this.model, middle));

		const right = DOMHelper.createElement(bottom, 'div', 'col');
		const equip = DOMHelper.createElement(right, 'div');
		this.addChild(new SheetEquipRenderer(this.game, this.model, equip));
		const stats = DOMHelper.createElement(right, 'div');
		this.addChild(new SheetStatsRenderer(this.game, this.model, stats));

		const skills = DOMHelper.createElement(bottom, 'div', 'sheet-skills');
		this.addChild(new SheetSkillsRenderer(this.game, this.model, skills));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
