import ControllerBase from "wgge/core/controller/ControllerBase";
import ItemSlotController from "../../inventory/slot/ItemSlotController";

export default class CursorItemController extends ControllerBase {

	/**
	 * @type ItemSlotModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(new ItemSlotController(game, model));

	}

}
