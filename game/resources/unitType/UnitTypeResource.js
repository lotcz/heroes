import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";
import UnitStatsModel from "../../savegame/group/unit/UnitStatsModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ItemModel from "../../savegame/items/ItemModel";

export default class UnitTypeResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type StringValue
	 */
	image;

	/**
	 * @type UnitStatsModel
	 */
	baseStats;

	constructor(id) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.image = this.addProperty('image', new StringValue());
		this.baseStats = this.addProperty('baseStats', new UnitStatsModel());

		this.loot = this.addProperty('items', new ModelNodeCollection(() => new ItemModel(), true));

	}

	addLoot(itemDefinition) {
		this.loot.add(new ItemModel(itemDefinition.id.get()));
	}

}
