import ControllerBase from "wgge/core/controller/ControllerBase";

export default class FactionController extends ControllerBase {

	/**
	 * @type FactionModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addAutoEvent(
			this.model.raceId,
			'change',
			() => this.updateRace(),
			true
		);
	}

	updateRace() {
		this.model.race.set(this.game.resources.races.getById(this.model.raceId.get()));
	}

}
