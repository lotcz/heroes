import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";

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

		this.land = this.addElement('div', 'land');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.visitingBiotope,
				(biotope) => new DirtyValueRenderer(this.game, biotope.name, this.land)
			)
		);
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.movement);
		this.removeElement(this.land);
	}

}
