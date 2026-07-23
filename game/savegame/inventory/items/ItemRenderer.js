import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import ImageDomRenderer from "wgge/core/renderer/dom/ImageDomRenderer";

export default class ItemRenderer extends DomRenderer {

	/**
	 * @type ItemModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.itemDefinition,
				(m) => new ImageDomRenderer(
					this.game,
					m.image,
					dom
				)
			)
		);
	}

}
