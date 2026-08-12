import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import Vector2Renderer from "wgge/core/renderer/dom/Vector2Renderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";

export default class CursorInfoTileRenderer extends DomRenderer {

	/**
	 * @type TileModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

	}

	activateInternal() {
		this.wrapper = this.addElement('div', 'cursor-info-tile');
		const coords = DOMHelper.createElement(this.wrapper, 'div', 'coords');
		this.addChild(new Vector2Renderer(this.game, this.model.position, coords));
		const units = DOMHelper.createElement(this.wrapper, 'div', 'units');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.group,
				(m) => new Vector2Renderer(
					this.game,
					m,
					units
				)
			)
		);
		const location = DOMHelper.createElement(this.wrapper, 'div', 'location');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.location,
				(l) => new DirtyValueRenderer(
					this.game,
					l.name,
					location
				)
			)
		);

	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.wrapper);
	}

}
