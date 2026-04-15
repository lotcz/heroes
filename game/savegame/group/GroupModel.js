import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import Vector2 from "wgge/core/model/vector/Vector2";
import GroupStatsModel from "./GroupStatsModel";
import UnitModel from "./unit/UnitModel";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class GroupModel extends ModelNodeCollection {

	/**
	 * @type Vector2
	 */
	name;

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
		super(() => new UnitModel(), true);

		this.position = this.addProperty('position', new Vector2());
		this.renderingOffset = this.addProperty('renderingOffset', new Vector2(0, 0, false));
		this.isInView = this.addProperty('isInView', new BoolValue(false, false));
		this.stats = this.addProperty('stats', new GroupStatsModel());

		this.onDeathHandler = (unit) => this.unitDied(unit);

		this.addOnAddListener((unit) => unit.addEventListener('death', this.onDeathHandler));
		this.addOnRemoveListener((unit) => {
			unit.removeEventListener('death', this.onDeathHandler);
			this.checkGroupMembers();
		});
	}

	checkGroupMembers() {
		if (this.isEmpty()) {
			this.triggerEvent('group-perished', this);
		}
	}

	unitDied(unit) {
		this.triggerEvent('unit-died', unit);
		this.remove(unit);
	}

}

