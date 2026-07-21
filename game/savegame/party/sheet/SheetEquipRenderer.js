import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import ItemSlotRenderer from "../../inventory/items/ItemSlotRenderer";

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

		const items = DOMHelper.createElement(this.container, 'div', 'inventory');
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.head, items, 'head'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.meleeWeapon, items, 'melee'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.body, items, 'body'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.rangedWeapon, items));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.legs, items, 'legs'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.talisman, items));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.shoes, items, 'shoes'));

	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
