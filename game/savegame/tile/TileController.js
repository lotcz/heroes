import ControllerBase from "wgge/core/controller/ControllerBase";

export default class TileController extends ControllerBase {

	/**
	 * @type TileModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
	}

	activateInternal() {
		const save = this.game.saveGame.get();
		const location = save.locations.find((l) => l.position.equalsTo(this.model.position));
		this.model.location.set(location);
	}

	deactivateInternal() {
		this.model.location.set(null);
	}
}
