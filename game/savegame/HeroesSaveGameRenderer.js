import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import TravelRenderer from "./travel/TravelRenderer";
import ConditionalNodeRenderer from "wgge/core/renderer/generic/ConditionalNodeRenderer";
import CursorItemRenderer from "./cursor/CursorItemRenderer";

export default class HeroesSaveGameRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.addChild(new TravelRenderer(game, model, dom));

		// CURSOR
		this.addChild(
			new ConditionalNodeRenderer(
				this.game,
				this.model.selectedItem.item,
				() => this.model.selectedItem.item.isSet(),
				() => new CursorItemRenderer(this.game, this.model.selectedItem, this.dom)
			)
		);
	}

}
