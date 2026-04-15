import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import Vector2 from "wgge/core/model/vector/Vector2";
import GroupStatsModel from "./GroupStatsModel";
import UnitModel from "./unit/UnitModel";
import BoolValue from "wgge/core/model/value/BoolValue";
import ObjectModel from "wgge/core/model/ObjectModel";

export default class GroupModel extends ObjectModel {

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
	 * @type BoolValue
	 */
	isInView;

	/**
	 * @type GroupStatsModel
	 */
	stats;

	constructor() {
		super(true);

		this.members = this.addProperty('members', new ModelNodeCollection(() => new UnitModel(), true));
		this.position = this.addProperty('position', new Vector2());
		this.renderingOffset = this.addProperty('renderingOffset', new Vector2(0, 0, false));
		this.isInView = this.addProperty('isInView', new BoolValue(false, false));
		this.stats = this.addProperty('stats', new GroupStatsModel());

		this.onDeathHandler = (unit) => this.unitDied(unit);

		this.members.addOnAddListener((unit) => unit.addEventListener('death', this.onDeathHandler));
		this.members.addOnRemoveListener((unit) => {
			unit.removeEventListener('death', this.onDeathHandler);
			this.checkGroupMembers();
		});
	}

	checkGroupMembers() {
		if (this.members.isEmpty()) {
			this.triggerEvent('group-perished', this);
		}
	}

	unitDied(unit) {
		this.triggerEvent('unit-died', unit);
		this.members.remove(unit);
	}

}

