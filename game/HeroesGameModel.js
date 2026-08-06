import GameModel from "wgge/game/GameModel";
import HeroesResources from "./resources/HeroesResources";
import StringValue from "wgge/core/model/value/StringValue";

export default class HeroesGameModel extends GameModel {

	/**
	 * @type HeroesResources
	 */
	resources;

	/**
	 * @type StringValue
	 */
	message;

	constructor(debugModeEnabled = true) {
		super(debugModeEnabled);

		this.resources = this.addProperty('resources', new HeroesResources());
		this.message = this.addProperty('message', new StringValue());
	}

}
