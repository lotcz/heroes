import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import SheetEquipRenderer from "./SheetEquipRenderer";
import SheetItemsRenderer from "./SheetItemsRenderer";
import SheetSkillsRenderer from "./SheetSkillsRenderer";
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

		const top = DOMHelper.createElement(this.container, 'div');

		const name = DOMHelper.createElement(top, 'h2', 'center');
		this.addChild(new DirtyValueRenderer(this.game, this.model.name, name));

		const info = DOMHelper.createElement(top, 'div', 'center row');

		const race = DOMHelper.createElement(info, 'div', 'row center');
		DOMHelper.createElement(race, 'span', 'small p-1', 'Breed:');
		const raceName = DOMHelper.createElement(race, 'h4');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.faction,
				(f) => new NullableNodeRenderer(
					this.game,
					f.race,
					(r) => new DirtyValueRenderer(this.game, r.name, raceName)
				)
			)
		);

		const type = DOMHelper.createElement(info, 'div', 'row center');
		DOMHelper.createElement(type, 'span', 'small p-1', 'Calling:');
		const typeName = DOMHelper.createElement(type, 'h4');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.unitType,
				(t) => new DirtyValueRenderer(this.game, t.name, typeName)
			)
		);

		const tribe = DOMHelper.createElement(info, 'div', 'row center');
		DOMHelper.createElement(tribe, 'span', 'small p-1', 'Tribe:');
		const tribeName = DOMHelper.createElement(tribe, 'h4');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.faction,
				(f) => new DirtyValueRenderer(this.game, f.name, tribeName)
			)
		);

		const bottom = DOMHelper.createElement(this.container, 'div', 'bottom row');
		this.addChild(new SheetItemsRenderer(this.game, this.model, bottom));
		this.addChild(new SheetEquipRenderer(this.game, this.model, bottom));
		this.addChild(new SheetSkillsRenderer(this.game, this.model, bottom));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
