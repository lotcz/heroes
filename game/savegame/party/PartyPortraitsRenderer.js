import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import CollectionRenderer from "wgge/core/renderer/generic/CollectionRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import PartyPortraitRenderer from "./PartyPortraitRenderer";

export default class PartyPortraitsRenderer extends DomRenderer {

	/**
	 * @type PartyModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;

		this.addChild(
			new CollectionRenderer(game, this.model.members, (m) => new PartyPortraitRenderer(game, m, this.container))
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'party-portraits');
	}

	deactivateInternal() {
		DOMHelper.destroyElement(this.container);
		this.container = null;
	}

}
