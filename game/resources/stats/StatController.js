import ControllerBase from "wgge/core/controller/ControllerBase";

export default class StatController extends ControllerBase {

	/**
	 * @type StatModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addAutoEvent(
			this.model.definitionId,
			'change',
			() => {
				if (this.model.definition.isEmpty() || !this.model.definition.get().id.equalsTo(this.model.definitionId.get())) {
					this.model.definition.set(this.game.resources.statDefinitions.get(this.model.definitionId.get()));
				}
			},
			true
		);

	}
}
