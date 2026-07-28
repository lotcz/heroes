import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import Vector2 from "wgge/core/model/vector/Vector2";
import GroupStatsModel from "./GroupStatsModel";
import UnitModel from "../UnitModel";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";

export default class GroupModel extends IdentifiedModelNode {

	/**
	 * @type ModelNodeCollection
	 */
	members;

	/**
	 * @type Vector2
	 */
	position;

	/**
	 * @type Vector2
	 */
	renderingOffset;

	/**
	 * @type GroupStatsModel
	 */
	stats;

	constructor() {
		super(true);

		this.members = this.addProperty('members', new ModelNodeCollection(() => new UnitModel(), true));
		this.members.addOnChangeListener(() => this.checkGroupMembers());

		this.position = this.addProperty('position', new Vector2());
		this.renderingOffset = this.addProperty('renderingOffset', new Vector2(0, 0, false));
		this.stats = this.addProperty('stats', new GroupStatsModel());

		this.onDropItemHandler = (item) => this.triggerEvent('drop-item', item);
		this.members.addOnAddListener((unit) => unit.addEventListener('drop-item', this.onDropItemHandler));
		this.members.addOnRemoveListener((unit) => unit.removeEventListener('drop-item', this.onDropItemHandler));
	}

	checkGroupMembers() {
		if (this.members.isEmpty()) {
			this.triggerEvent('group-perished', this);
		}
	}

}

