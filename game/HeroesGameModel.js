import GameModel from "wgge/game/GameModel";
import Vector2 from "wgge/core/model/vector/Vector2";

export default class HeroesGameModel extends GameModel {

	/**
	 * @type Vector2
	 */
	viewBoxCenter;

	constructor(debugModeEnabled = true) {
		super(debugModeEnabled);

		this.viewBoxCenter = this.addProperty('viewBoxCenter', new Vector2());

		this.viewBoxSize.addOnChangeListener(() => this.viewBoxCenter.set(this.viewBoxSize.multiply(0.5)));

	}

}
