import GameModel from "wgge/game/GameModel";
import HeroesResources from "./resources/HeroesResources";

export default class HeroesGameModel extends GameModel {

	/**
	 * @type HeroesResources
	 */
	resources;

	constructor(debugModeEnabled = true) {
		super(debugModeEnabled);

		this.resources = this.addProperty('resources', new HeroesResources());
	}

}
