import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import InventoryRenderer from "../../inventory/InventoryRenderer";
import ExpendableStatBarRenderer from "../../../resources/stats/rendering/ExpendableStatBarRenderer";
import ItemSlotRenderer from "../../inventory/slot/ItemSlotRenderer";

export default class SheetItemsRenderer extends DomRenderer {

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
		this.container = this.addElement('div', 'sheet-items col');

		const top = DOMHelper.createElement(this.container, 'div', 'top row');
		const eat = DOMHelper.createElement(top, 'div', 'inventory');
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.consume, eat, 'consume'));

		const other = DOMHelper.createElement(top, 'div', 'gauges row');
		this.addChild(new ExpendableStatBarRenderer(this.game, this.model.stats.hunger, other));
		this.addChild(new ExpendableStatBarRenderer(this.game, this.model.stats.thirst, other));

		const items = DOMHelper.createElement(this.container, 'div', 'items');
		this.addChild(new InventoryRenderer(this.game, this.model.inventory.items, items));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
