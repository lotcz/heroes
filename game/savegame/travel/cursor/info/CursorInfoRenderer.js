import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import ConditionalNodeRenderer from "wgge/core/renderer/generic/ConditionalNodeRenderer";
import CursorInfoItemRenderer from "./CursorInfoItemRenderer";

export default class CursorInfoRenderer extends DomRenderer {

	/**
	 * @type TravelModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.wrapper = null;

		this.addChild(
			new ConditionalNodeRenderer(
				this.game,
				this.model.selectedItem.item,
				() => this.model.selectedItem.item.isSet(),
				() => new CursorInfoItemRenderer(this.game, this.model.selectedItem.item.get(), this.dom)
			)
		);
	}

}
