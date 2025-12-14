import GameRenderer from "wgge/game/GameRenderer";
import TileBoardRenderer from "./tiles/TileBoardRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";

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
				(m)=> new TileBoardRenderer(this.game, m, this.saveGameLayer)
			)
		);
	}

}
