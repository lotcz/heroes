import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import StatNumericRenderer from "../../../resources/stats/rendering/StatNumericRenderer";
import UnitInventoryRenderer from "./UnitInventoryRenderer";
import ImageDomRenderer from "wgge/core/renderer/dom/ImageDomRenderer";

export default class PartyCharacterSheetRenderer extends DomRenderer {

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
		this.container = this.addElement('div', 'character-sheet');
		const back = DOMHelper.createElement(
			this.container,
			'button',
			'back',
			'Back',
			() => this.save.triggerEvent('select-character', null)
		);
		const portrait = DOMHelper.createElement(this.container, 'div', 'portrait')
		this.addChild(new ImageDomRenderer(this.game, this.model.portrait, portrait));
		this.addChild(new UnitInventoryRenderer(this.game, this.model.inventory, this.container));
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.meleeDamage, this.container));
		this.addChild(new StatNumericRenderer(this.game, this.model.stats.health, this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
