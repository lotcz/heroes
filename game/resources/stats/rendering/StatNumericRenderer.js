import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class StatNumericRenderer extends DomRenderer {

	/**
	 * @type StatModel
	 */
	model;

	/**
	 * @type ?string
	 */
	extraClass;

	constructor(game, model, dom, extraClass = null) {
		super(game, model, dom);

		this.model = model;
		this.extraClass = extraClass;
		this.save = this.game.saveGame.get();
	}

	activateInternal() {
		this.container = this.addElement('div', 'stat-numeric');
		if (this.extraClass) DOMHelper.addClass(this.container, this.extraClass);
		this.addChild(new DirtyValueRenderer(this.game, this.model.effectiveValue, this.container));

		this.container.addEventListener('mouseover', () => this.save.cursorInfo.stat.set(this.model));
		this.container.addEventListener('mouseout', () => this.save.cursorInfo.stat.set(null));
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
		this.container = null;
	}

}
