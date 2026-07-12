import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import ItemSlotRenderer from "../../inventory/items/ItemSlotRenderer";
import StatNameAndValueRenderer from "../../../resources/stats/rendering/StatNameAndValueRenderer";

export default class SheetEquipRenderer extends DomRenderer {

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
		this.container = this.addElement('div', 'sheet-equip');
		const left = DOMHelper.createElement(this.container, 'div', 'col');
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.level, left));
		this.addChild(new StatNameAndValueRenderer(this.game, this.model.stats.experience, left));

		const items = DOMHelper.createElement(this.container, 'div', 'inventory');
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.leftHand, items));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.rightHand, items));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.talisman, items));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
