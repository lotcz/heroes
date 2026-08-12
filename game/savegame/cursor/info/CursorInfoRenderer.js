import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import CursorInfoItemRenderer from "./CursorInfoItemRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import CursorInfoTileRenderer from "./CursorInfoTileRenderer";

export default class CursorInfoRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.wrapper = null;

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.selectedItem.item,
				() => new CursorInfoItemRenderer(this.game, this.model.selectedItem.item.get(), this.dom),
				() => new NullableNodeRenderer(
					this.game,
					this.model.cursorTile,
					() => new CursorInfoTileRenderer(this.game, this.model.cursorTile.get(), this.dom)
				)
			)
		);
	}

}
