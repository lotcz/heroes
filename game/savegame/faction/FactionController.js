import ControllerBase from "wgge/core/controller/ControllerBase";

export default class FactionController extends ControllerBase {

	/**
	 * @type FactionModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
	}

	activateInternal() {
		if (!this.model.raceId.isSet()) return;
		this.model.race.set(this.game.resources.races.getById(this.model.raceId.get()));
	}

	deactivateInternal() {
		this.model.race.set(null);
	}

}
