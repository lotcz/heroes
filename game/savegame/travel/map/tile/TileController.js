import ControllerBase from "wgge/core/controller/ControllerBase";
import InventoryController from "../../../inventory/InventoryController";

export default class TileController extends ControllerBase {

	/**
	 * @type TileModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.save = this.game.saveGame.get();

		this.addChild(new InventoryController(game, this.model.items));

		this.addAutoEvent(
			this.model.locationId,
			'change',
			() => {
				this.model.location.set(
					this.save.travel.locations.getById(this.model.locationId.get())
				);
			},
			true
		);

		this.addAutoEvent(
			this.model.rivers.riverId,
			'change',
			() => {
				this.model.river.set(
					this.save.travel.rivers.get(this.model.rivers.riverId.get())
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
	}
}
