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
		const save = this.game.saveGame.get();
		const tile = save.getTile(this.model.position);
		tile.location.set(this.model);
	}

}
