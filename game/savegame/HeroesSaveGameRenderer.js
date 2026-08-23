import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import TravelRenderer from "./travel/TravelRenderer";
import ConditionalNodeRenderer from "wgge/core/renderer/generic/ConditionalNodeRenderer";
import CursorItemRenderer from "./cursor/CursorItemRenderer";
import CursorInfoRenderer from "./cursor/info/CursorInfoRenderer";

export default class HeroesSaveGameRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.addChild(new TravelRenderer(game, model, dom));

		// CURSOR INFO
		this.addChild(new CursorInfoRenderer(this.game, this.model.cursorInfo, dom));

		// CURSOR
		this.addChild(
			new ConditionalNodeRenderer(
				this.game,
				this.model.cursorItem.item,
				() => this.model.cursorItem.item.isSet(),
				() => new CursorItemRenderer(this.game, this.model.cursorItem, this.dom)
			)
		);
	}

}
