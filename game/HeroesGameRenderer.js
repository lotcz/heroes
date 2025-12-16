import GameRenderer from "wgge/game/GameRenderer";
import TravelRenderer from "./savegame/travel/TravelRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import HeroesSaveGameRenderer from "./savegame/HeroesSaveGameRenderer";

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
				(m)=> new HeroesSaveGameRenderer(this.game, m, this.saveGameLayer)
			)
		);
	}

}
