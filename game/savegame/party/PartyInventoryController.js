import CollectionController from "wgge/core/controller/CollectionController";
import ItemSlotController from "../items/ItemSlotController";

export default class PartyInventoryController extends CollectionController {

	/**
	 * @type PartyInventoryModel
	 */
	model;

	constructor(game, model) {
		super(game, model, (m) => new ItemSlotController(game, m));

		this.model = model;
	}

}
