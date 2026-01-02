import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";

export default class TopMenuRenderer extends DomRenderer {

	/**
	 * @type TravelModel
	 */
	model;

	constructor(game, model, element) {
		super(game, model, element);

		this.model = model;

	}

	activateInternal() {
		this.movement = this.addElement('div', 'party-movement');
		this.addChild(new DirtyValueRenderer(this.game, this.model.partyMovement.currentValue, this.movement));
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.movement);
	}

}
