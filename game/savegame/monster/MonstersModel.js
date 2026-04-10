import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import MonsterModel from "./MonsterModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import BoolValue from "wgge/core/model/value/BoolValue";

export default class MonstersModel extends ModelNodeTable {

	/**
	 * @type ModelNodeCollection
	 */
	movingMonsters;

	/**
	 * @type BoolValue
	 */
	isMonsterMoving;

	constructor() {
		super((id) => new MonsterModel(id));

		this.movingMonsters = this.addProperty('movingMonsters', new ModelNodeCollection());

		this.monsterStartedMovingHandler = (m) => this.movingMonsters.add(m);
		this.monsterFinishedMovingHandler = (m) => this.movingMonsters.remove(m);

		this.monsterAddedHandler = (m) => {
			m.addEventListener(
				'started-moving',
				this.monsterStartedMovingHandler
			);
			m.addEventListener(
				'finished-moving',
				this.monsterFinishedMovingHandler
			);
		}

		this.monsterRemovedHandler = (m) => {
			m.removeEventListener(
				'started-moving',
				this.monsterStartedMovingHandler
			);
			m.removeEventListener(
				'finished-moving',
				this.monsterFinishedMovingHandler
			);
			//console.log('removing', m.name.get());
			//this.movingMonsters.remove(m);
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

}

