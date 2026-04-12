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

		this.addAutoEvent(
			this.model.locationId,
			'change',
			() => {
				this.model.location.set(
					this.save.locations.getById(this.model.locationId.get())
				);
			},
			true
		);

		this.addAutoEvent(
			this.model.rivers.riverId,
			'change',
			() => {
				this.model.river.set(
					this.save.rivers.get(this.model.rivers.riverId.get())
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
					const decor = biotope.decorations.getById(this.model.decorId.get());
					if (decor) {
						this.model.decor.set(decor);
						this.model.isBlocked.set(decor.isBlocking.get());
					} else {
						console.warn(`Decor ${this.model.decorId.get()} not found for biotope ${biotope.name.get()}!`)
					}
				}
			}
		}
	}

	deactivateInternal() {
		this.model.biotope.set(null);
		this.model.location.set(null);
		this.model.decor.set(null);
		this.model.monster.set(null);
	}
}
