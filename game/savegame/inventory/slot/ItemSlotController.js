import ControllerBase from "wgge/core/controller/ControllerBase";
import NullableNodeController from "wgge/core/controller/NullableNodeController";
import ItemController from "../items/ItemController";

export default class ItemSlotController extends ControllerBase {

	/**
	 * @type ItemSlotModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(
			new NullableNodeController(
				this.game,
				this.model.item,
				(m) => new ItemController(this.game, m)
			)
		);

	}
}
