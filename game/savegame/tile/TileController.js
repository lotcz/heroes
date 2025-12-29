import ControllerBase from "wgge/core/controller/ControllerBase";

export default class TileController extends ControllerBase {

	/**
	 * @type TileModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.save = this.game.saveGame.get();

		this.addAutoEvent(
			this.model.monsterId,
			'change',
			() => {
				this.model.monster.set(
					this.save.travel.monsters.getById(this.model.monsterId.get())
				);
			},
			true
		);
	}

	activateInternal() {
		if (this.model.biotopeId.isSet()) {
			const biotope = this.game.resources.biotopes.getById(this.model.biotopeId.get());
			if (biotope) {
				this.model.biotope.set(biotope);
				if (this.model.decorId.isSet()) {
					this.model.decor.set(biotope.decorations.getById(this.model.decorId.get()));
				}
			}
		}

		if (this.model.locationId.isSet()) {
			const location = this.save.locations.getById(this.model.locationId.get());
			this.model.location.set(location);
		}
	}

	deactivateInternal() {
		this.model.biotope.set(null);
		this.model.location.set(null);
		this.model.decor.set(null);
		this.model.monster.set(null);
	}
}
