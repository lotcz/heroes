import ControllerBase from "wgge/core/controller/ControllerBase";
import CollectionController from "wgge/core/controller/CollectionController";
import StatController from "../../../resources/stats/StatController";

export default class UnitStatsController extends ControllerBase {

	/**
	 * @type UnitStatsModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(
			new CollectionController(
				this.game,
				this.model.all,
				(m) => new StatController(this.game, m)
			)
		);

	}

}
