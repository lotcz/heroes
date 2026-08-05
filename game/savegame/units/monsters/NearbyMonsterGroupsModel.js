import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import BoolValue from "wgge/core/model/value/BoolValue";

/**
 * Collection of GroupModel representing nearby monster groups
 */
export default class NearbyMonsterGroupsModel extends ModelNodeCollection {

	/**
	 * @type ModelNodeCollection
	 */
	movingMonsters;

	/**
	 * @type BoolValue
	 */
	isMonsterMoving;

	constructor() {
		super(null, false);

		this.movingMonsters = this.addProperty('movingMonsters', new ModelNodeCollection(null, false));

		this.monsterStartedMovingHandler = (m) => this.movingMonsters.add(m);
		this.monsterFinishedMovingHandler = (m) => this.movingMonsters.remove(m);

		this.monsterAddedHandler = (m) => {
			m.addEventListener('started-moving', this.monsterStartedMovingHandler);
			m.addEventListener('finished-moving', this.monsterFinishedMovingHandler);
		}

		this.monsterRemovedHandler = (m) => {
			m.removeEventListener('started-moving', this.monsterStartedMovingHandler);
			m.removeEventListener('finished-moving', this.monsterFinishedMovingHandler);
			this.movingMonsters.remove(m);
		}

		this.children.addOnAddListener(this.monsterAddedHandler);
		this.children.addOnRemoveListener(this.monsterRemovedHandler);

		this.isMonsterMoving = this.addProperty('isMonsterMoving', new BoolValue(false, false));
		this.movingMonsters.addEventListener(
			'change',
			() => this.isMonsterMoving.set(!this.movingMonsters.isEmpty()),
			true
		);
	}

	getAllUnits() {
		return this.reduce(
			(units, group) => {
				group.members.forEach((m) => units.push(m));
				return units;
			},
			[]
		);
	}

	getNames() {
		return this.getAllUnits().map((m) => m.name.get());
	}

	add(monster) {
		if (!this.contains(monster)) return super.add(monster);
		return monster;
	}

}

