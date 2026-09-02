import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class ExploreInfoBoxRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, element) {
		super(game, model, element);

		this.model = model;

	}

	activateInternal() {
		this.container = this.addElement('div', 'inner');


		const buttons = DOMHelper.createElement(this.container, 'div', 'row');
		DOMHelper.createElement(buttons, 'button', '', 'Map', () => this.model.gameMode.set('map'));

	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
	}

}
