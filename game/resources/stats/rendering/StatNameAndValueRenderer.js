import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import StatNumericRenderer from "./StatNumericRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";

export default class StatNameAndValueRenderer extends DomRenderer {

	/**
	 * @type StatModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.save = this.game.saveGame.get();
	}

	activateInternal() {
		this.container = this.addElement('div', 'stat row');
		const name = DOMHelper.createElement(this.container, 'div');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.definition,
				(m) => new DirtyValueRenderer(this.game, m.name, name)
			)
		)
		this.value = DOMHelper.createElement(this.container, 'div', 'value');
		this.addChild(new StatNumericRenderer(this.game, this.model, this.value));

		this.container.addEventListener('mouseover', () => this.save.cursorInfo.stat.set(this.model));
		this.container.addEventListener('mouseout', () => this.save.cursorInfo.stat.set(null));

		this.renderInternal();
	}

	renderInternal() {
		DOMHelper.toggleClass(this.value, 'has-effects', !this.model.effectiveValue.equalsTo(this.model.baseValue.get()));
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
		this.container = null;
	}

}
