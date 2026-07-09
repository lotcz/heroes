import ControllerBase from "wgge/core/controller/ControllerBase";
import UnitInventoryItemSlotController from "./UnitInventoryItemSlotController";
import InventoryController from "../../inventory/InventoryController";

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

		this.addChild(new InventoryController(game, this.model.items));

		this.addChild(new UnitInventoryItemSlotController(game, this.model.leftHand, stats));
		this.addChild(new UnitInventoryItemSlotController(game, this.model.rightHand, stats));
		this.addChild(new UnitInventoryItemSlotController(game, this.model.talisman, stats));

	}
}
