import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import CursorInfoItemRenderer from "./CursorInfoItemRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import CursorInfoTileRenderer from "./CursorInfoTileRenderer";
import DomContainerHostRenderer from "wgge/core/renderer/dom/DomContainerHostRenderer";

export default class CursorInfoRenderer extends DomRenderer {

	/**
	 * @type CursorInfoModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.addChild(
			new DomContainerHostRenderer(
				game,
				model,
				dom,
				(container) => new NullableNodeRenderer(
					this.game,
					this.model.item,
					(m) => new CursorInfoItemRenderer(this.game, m, container),
					() => new NullableNodeRenderer(
						this.game,
						this.model.tile,
						(m) => new CursorInfoTileRenderer(this.game, m, container)
					)
				),
				'cursor-info'
			)
		);

	}

}
