import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import ItemSlotRenderer from "../../inventory/slot/ItemSlotRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import ExpendableStatBarRenderer from "../../../resources/stats/rendering/ExpendableStatBarRenderer";

export default class SheetMiddleRenderer extends DomRenderer {

	/**
	 * @type UnitModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
	}

	activateInternal() {
		this.container = this.addElement('div', 'sheet-middle');
		const eat = DOMHelper.createElement(this.container, 'div', 'inventory');
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.consume, eat, 'consume'));

		const other = DOMHelper.createElement(this.container, 'div', 'gauges');
		this.addChild(new ExpendableStatBarRenderer(this.game, this.model.stats.hunger, other));
		this.addChild(new ExpendableStatBarRenderer(this.game, this.model.stats.thirst, other));
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
		this.container = null;
	}

}
