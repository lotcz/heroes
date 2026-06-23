import ControllerBase from "wgge/core/controller/ControllerBase";
import CollectionController from "wgge/core/controller/CollectionController";
import UnitInventoryItemSlotController from "./UnitInventoryItemSlotController";

export default class UnitInventoryController extends ControllerBase {

	/**
	 * @type UnitInventoryModel
	 */
	model;

	/**
	 * @type UnitStatsModel
	 */
	stats;

	constructor(game, model, stats) {
		super(game, model);

		this.model = model;
		this.stats = stats;

		this.addChild(
			new CollectionController(
				game,
				this.model,
				(m) => new UnitInventoryItemSlotController(game, m, stats)
			)
		);

	}
}
