import ControllerBase from "wgge/core/controller/ControllerBase";

export default class LocationController extends ControllerBase {

	/**
	 * @type LocationModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.save = this.game.saveGame.get();
		this.tile = this.save.travel.tiles.getTile(this.model.position);

		this.addAutoEvent(
			this.tile.discovered,
			'change',
			() => {
				if (this.tile.discovered.get() > 0) {
					this.model.discovered.set(true);
				}
			}
		);
	}

	activateInternal() {
		if (!this.model.factionId.isSet()) return;

		const faction = this.save.factions.getById(this.model.factionId.get());
		this.model.faction.set(faction);

	}

	deactivateInternal() {
		this.model.faction.set(null);
	}
}
