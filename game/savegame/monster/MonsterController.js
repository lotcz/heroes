import ControllerBase from "wgge/core/controller/ControllerBase";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import AnimationVector2Controller from "wgge/core/controller/AnimationVector2Controller";
import LocationModel from "../location/LocationModel";
import {DEAD_BODY_SPRITE} from "../../resources/HeroesResources";

export default class MonsterController extends ControllerBase {

	/**
	 * @type MonsterModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.save = this.game.saveGame.get();
		this.tile = null;

		this.addAutoEvent(
			this.save.travel,
			'end-turn',
			() => this.moveMonster()
		);

		this.addAutoEvent(
			this.model.stats,
			'death',
			() => {
				this.model.removeMyself();
				if (this.tile) {
					this.tile.monsterId.set(null);
				}
				const location = new LocationModel();
				location.position.set(this.model.position);
				location.image.set(DEAD_BODY_SPRITE);
				location.factionId.set(this.model.factionId.get());
				location.name.set(this.model.name.get());
				location.discovered.set(true);
				this.save.locations.add(location);
				this.tile.locationId.set(location.id.get());
			}
		);

	}

	activateInternal() {
		this.tile = this.save.travel.tiles.getTile(this.model.position);
		const faction = this.save.factions.getById(this.model.factionId.get());
		this.model.faction.set(faction);
		const race = faction.race.get();
		const unitType = race.unitTypes.getById(this.model.unitTypeId.get());
		if (!unitType) {
			console.log('Unit type not found', this.model.name.get(), this.model.unitTypeId.get());
		}
		this.model.unitType.set(unitType);
	}

	deactivateInternal() {
		//this.model.unitType.set(null);
	}

	moveMonster() {
		let neighbors = this.save.travel.tiles.getFreeNeighbors(this.model.position);
		if (this.model.isSwimming()) {
			neighbors = neighbors.filter(n => n.isWater());
		} else if (!this.model.isFlying()) {
			neighbors = neighbors.filter(n => n.isLand());
		}
		const tile = ArrayHelper.random(neighbors);
		if (!tile) {
			console.log('nowhere to move');
			return;
		}
		this.model.triggerEvent('started-moving', this.model);
		this.addChild(
			new AnimationVector2Controller(
				this.game,
				this.model.position,
				tile.position,
				500
			).onFinished(
				() => {
					if (this.tile) this.tile.monsterId.set(null);
					this.tile = tile;
					this.model.position.set(this.tile.position);
					this.tile.monsterId.set(this.model.id.get());
					this.model.triggerEvent('finished-moving', this.model);
				}
			)
		);

	}
}
