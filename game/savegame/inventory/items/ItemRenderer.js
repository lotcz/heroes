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
		this.save = this.game.saveGame.get();

		// update cursor info
		this.addAutoEvent(
			dom,
			'mouseover',
			() => {
				this.save.cursorInfo.item.set(this.model);
			}
		);

		this.addAutoEvent(
			dom,
			'mouseout',
			() => {
				this.save.cursorInfo.item.set(null);
			}
		);

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
