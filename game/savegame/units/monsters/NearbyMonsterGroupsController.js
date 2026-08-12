import ActiveMonsterGroupController from "./ActiveMonsterGroupController";
import NullableNodeController from "wgge/core/controller/NullableNodeController";
import CollectionController from "wgge/core/controller/CollectionController";
import GroupBasicController from "../group/GroupBasicController";
import ControllerBase from "wgge/core/controller/ControllerBase";

export default class NearbyMonsterGroupsController extends ControllerBase {

	/**
	 * @type NearbyMonsterGroupsModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.save = this.game.saveGame.get();

		this.addChild(
			new CollectionController(
				game,
				model,
				(m) => new GroupBasicController(game, m)
			)
		);

		this.addChild(
			new NullableNodeController(
				this.game,
				this.model.activeMonster,
				(m) => new ActiveMonsterGroupController(this.game, m)
			)
		);

		this.addAutoEvent(
			this.save,
			'end-turn',
			() => this.actOnMonsterTurn()
		);

		this.addAutoEvent(
			this.save,
			'next-monster',
			() => this.nextMonster()
		);

	}

	actOnMonsterTurn() {
		this.model.forEach(m => {
			m.stats.movement.restore();
			this.model.monstersQueue.add(m);
		});
		this.nextMonster();
	}

	nextMonster() {
		const next = this.model.monstersQueue.first();
		console.log('next monster', next ? next.toString() : null);
		if (next) {
			this.model.monstersQueue.remove(next);
			this.model.activeMonster.set(next);
		} else {
			this.model.activeMonster.set(null);
			this.nextTurn();
		}
	}

	nextTurn() {
		this.runOnUpdate(() => this.save.triggerEvent('start-turn'));
	}
}
