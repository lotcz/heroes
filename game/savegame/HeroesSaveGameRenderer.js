import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import ConditionalNodeRenderer from "wgge/core/renderer/generic/ConditionalNodeRenderer";
import CursorItemRenderer from "./cursor/CursorItemRenderer";
import CursorInfoRenderer from "./cursor/info/CursorInfoRenderer";
import SwitchRenderer from "wgge/core/renderer/generic/SwitchRenderer";
import MapModeRenderer from "./modes/map/MapModeRenderer";
import ExploreModeRenderer from "./modes/explore/ExploreModeRenderer";

export default class HeroesSaveGameRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		// CURSOR INFO
		this.addChild(new CursorInfoRenderer(this.game, this.model.cursorInfo, this.dom));

		// CURSOR
		this.addChild(
			new ConditionalNodeRenderer(
				this.game,
				this.model.cursorItem.item,
				() => this.model.cursorItem.item.isSet(),
				() => new CursorItemRenderer(this.game, this.model.cursorItem, this.dom)
			)
		);

		// MAIN
		this.addChild(
			new SwitchRenderer(
				this.game,
				this.model,
				this.model.gameMode,
				{
					'map': () => new MapModeRenderer(this.game, this.model, this.dom),
					'explore': () => new ExploreModeRenderer(this.game, this.model, this.dom)
				}
			)
		);
	}

}
