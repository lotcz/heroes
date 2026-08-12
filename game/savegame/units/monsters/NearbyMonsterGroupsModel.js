import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import NullableNode from "wgge/core/model/value/NullableNode";

/**
 * Collection of GroupModel representing nearby monster groups
 */
export default class NearbyMonsterGroupsModel extends ModelNodeCollection {

	/**
	 * @type ModelNodeCollection
	 */
	monstersQueue;

	/**
	 * @type NullableNode<GroupModel>
	 */
	activeMonster;

	constructor() {
		super(null, false);

		this.monstersQueue = this.addProperty('monstersQueue', new ModelNodeCollection(null, false));
		this.activeMonster = this.addProperty('activeMonster', new NullableNode(null, false));

		this.addEventListener(
			'remove',
			(m) => {
				console.log('nearby monster removed', m.toString());
				this.monstersQueue.remove(m);
				// todo: if active monster died, switch to next monster
			}
		);
	}

	add(monster) {
		if (!this.contains(monster)) return super.add(monster);
		return monster;
	}

}

