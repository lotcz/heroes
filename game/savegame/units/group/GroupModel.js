import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import Vector2 from "wgge/core/model/vector/Vector2";
import GroupStatsModel from "./GroupStatsModel";
import UnitModel from "../UnitModel";
import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import BoolValue from "wgge/core/model/value/BoolValue";

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

	/**
	 * @type BoolValue
	 */
	isBusy;

	constructor() {
		super();

		this.members = this.addProperty('members', new ModelNodeCollection(() => new UnitModel()));
		this.members.addOnChangeListener(() => {
			if (this.isPerished()) {
				this.triggerEvent('group-perished', this);
				this.removeMyself();
			}
		});

		this.position = this.addProperty('position', new Vector2());
		this.tilePosition = this.addProperty('tilePosition', new Vector2(0, 0, false));
		this.position.addEventListener(
			'change',
			() => this.tilePosition.set(this.position.round()),
			true
		);

		this.renderingOffset = this.addProperty('renderingOffset', new Vector2(0, 0));
		this.stats = this.addProperty('stats', new GroupStatsModel());
		this.stats.movement.currentValue.addEventListener(
			'change',
			() => {
				if (this.stats.movement.currentValue.get() <= 0) {
					this.triggerEvent('end-my-turn');
				}
			}
		);
		this.onDropItemHandler = (item) => this.triggerEvent('drop-item', item);
		this.members.addOnAddListener((unit) => unit.addEventListener('drop-item', this.onDropItemHandler));
		this.members.addOnRemoveListener((unit) => unit.removeEventListener('drop-item', this.onDropItemHandler));

		this.isBusy = this.addProperty('isBusy', new BoolValue(false, false));
	}

	awardExperience(exp) {
		const perUnit = Math.round(exp / this.members.count());
		this.members.forEach((m) => m.stats.experience.baseValue.increase(perUnit));
	}

	toString() {
		return `[${this.members.map((m) => m.toString()).join(', ')}]`;
	}

	isPerished() {
		return this.members.isEmpty();
	}

	isAlive() {
		return !this.isPerished();
	}

}

