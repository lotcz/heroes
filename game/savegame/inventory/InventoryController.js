import CollectionController from "wgge/core/controller/CollectionController";
import ItemSlotController from "./slot/ItemSlotController";

export default class InventoryController extends CollectionController {

	/**
	 * @type DynamicInventoryModel
	 */
	model;

	constructor(game, model) {
		super(game, model, (m) => new ItemSlotController(game, m));

		this.model = model;
	}

}
