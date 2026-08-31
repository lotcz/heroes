import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";

export default class CursorInfoStatRenderer extends DomRenderer {

	/**
	 * @type StatModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

	}

	activateInternal() {
		this.wrapper = this.addElement('div', 'cursor-info-stat');
		const statDef = this.model.definition.get();
		if (!statDef) {
			console.error('Stat definition empty! Cannot show cursor info', this.model.definitionId.get());
			return;
		}
		const name = DOMHelper.createElement(this.wrapper, 'div', 'name');
		this.addChild(new DirtyValueRenderer(this.game, statDef.name, name));
		const desc = DOMHelper.createElement(this.wrapper, 'div', 'desc');
		this.addChild(new DirtyValueRenderer(this.game, statDef.description, desc));

	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.wrapper);
	}

}
