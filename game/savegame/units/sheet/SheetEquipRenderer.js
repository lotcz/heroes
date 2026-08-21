import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import ItemSlotRenderer from "../../inventory/slot/ItemSlotRenderer";
import StatNumericRenderer from "../../../resources/stats/rendering/StatNumericRenderer";
import MeleeInfoRenderer from "./MeleeInfoRenderer";
import RangedInfoRenderer from "./RangedInfoRenderer";

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
		this.container = this.addElement('div', 'sheet-equip col');
		const top = DOMHelper.createElement(this.container, 'div', 'top row');
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.health, top, 'health'));
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.armor, top, 'armor'));
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.dodging, top, 'dodging accuracy'));
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.fireResistance, top, 'fire'));
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.poisonResistance, top, 'poison'));

		const equip = DOMHelper.createElement(this.container, 'div', 'equip inventory');
		if (this.model.isFemale()) DOMHelper.addClass(equip, 'female');

		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.head, equip, 'head'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.meleeWeapon, equip, 'melee'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.body, equip, 'body'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.rangedWeapon, equip, 'ranged'));
		this.addChild(new MeleeInfoRenderer(this.game, this.model.stats, equip));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.legs, equip, 'legs'));
		this.addChild(new RangedInfoRenderer(this.game, this.model.stats, equip));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.shoes, equip, 'shoes'));

		const talismans = DOMHelper.createElement(this.container, 'div', 'talismans inventory');
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.talisman1, talismans, 'talisman1'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.talisman2, talismans, 'talisman2'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.talisman3, talismans, 'talisman3'));
		this.addChild(new ItemSlotRenderer(this.game, this.model.inventory.talisman4, talismans, 'talisman4'));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
