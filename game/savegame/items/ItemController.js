import ControllerBase from "wgge/core/controller/ControllerBase";

export default class ItemController extends ControllerBase {

	/**
	 * @type ItemModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addAutoEvent(
			this.model.itemDefinitionId,
			'change',
			() => {
				this.model.itemDefinition.set(this.game.resources.itemDefinitions.get(this.model.itemDefinitionId.get()));
			},
			true
		);

	}
}
