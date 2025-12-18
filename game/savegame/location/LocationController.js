import ControllerBase from "wgge/core/controller/ControllerBase";

export default class LocationController extends ControllerBase {

	/**
	 * @type LocationModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
	}

	activateInternal() {
		if (!this.model.factionId.isSet()) return;
		const save = this.game.saveGame.get();
		const faction = save.factions.getById(this.model.factionId.get());
		this.model.faction.set(faction);
	}

	deactivateInternal() {
		this.model.faction.set(null);
	}
}
