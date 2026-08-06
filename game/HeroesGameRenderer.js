import GameRenderer from "wgge/game/GameRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import HeroesSaveGameRenderer from "./savegame/HeroesSaveGameRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import DomContainerHostRenderer from "wgge/core/renderer/dom/DomContainerHostRenderer";

export default class HeroesGameRenderer extends GameRenderer {

	/**
	 * @type HeroesGameModel
	 */
	model;

	constructor(model, dom) {
		super(model, dom);

		this.model = model;

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.saveGame,
				(m) => new HeroesSaveGameRenderer(this.game, m, this.saveGameLayer),
				() => new DomContainerHostRenderer(
					this.game,
					this.model.message,
					this.saveGameLayer,
					(container) => new DirtyValueRenderer(this.game, this.model.message, container),
					'message container-host container'
				)
			)
		);
	}

}
