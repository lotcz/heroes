import DomContainerRenderer from "wgge/core/renderer/dom/DomContainerRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import ImageDomRenderer from "wgge/core/renderer/dom/ImageDomRenderer";

export default class BiotopeInfoRenderer extends DomContainerRenderer {

	/**
	 * @type BiotopeResource
	 */
	model;

	constructor(game, model, element) {
		super(game, model, element, 'biotope-info');

		this.model = model;

	}

	activateInternal() {
		super.activateInternal();
		const name = this.addElement('div', 'biotope-name');
		this.addChild(new DirtyValueRenderer(this.game, this.model.name, name));

		const illustration = this.addElement('div', 'biotope-illustration');
		this.addChild(new ImageDomRenderer(this.game, this.model.illustration, illustration));
	}

}
