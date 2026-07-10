import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import ImageDomRenderer from "wgge/core/renderer/dom/ImageDomRenderer";

export default class PartyPortraitRenderer extends DomRenderer {

	/**
	 * @type UnitModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;

		this.save = this.game.saveGame.get();

		this.addAutoEvent(
			this.save.travel.selectedCharacter,
			'change',
			() => DOMHelper.toggleClass(this.container, 'active', this.save.travel.selectedCharacter.equalsTo(this.model)),
			true
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'member');
		this.container.addEventListener('click', () => this.save.triggerEvent('select-character', this.model));

		const name = DOMHelper.createElement(this.container, 'div', 'name');
		this.addChild(new DirtyValueRenderer(this.game, this.model.name, name));

		const portrait = DOMHelper.createElement(this.container, 'div', 'portrait');
		this.addChild(new ImageDomRenderer(this.game, this.model.portrait, portrait));
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
