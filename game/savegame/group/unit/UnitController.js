import ControllerBase from "wgge/core/controller/ControllerBase";
import NumberHelper from "wgge/core/helper/NumberHelper";
import UnitInventoryController from "./UnitInventoryController";
import UnitStatsController from "./UnitStatsController";

export default class UnitController extends ControllerBase {

	/**
	 * @type UnitModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.save = this.game.saveGame.get();

		this.addChild(new UnitInventoryController(game, this.model.inventory, this.model.stats));
		this.addChild(new UnitStatsController(game, this.model.stats));

		this.addAutoEvent(
			this.model.factionId,
			'change',
			() => {
				this.updateFaction();
				this.updateUnitType();
			},
			true
		);

		this.addAutoEvent(
			this.model.unitTypeId,
			'change',
			() => this.updateUnitType(),
			true
		);

		this.addAutoEvent(
			this.model,
			'attacked',
			(strength) => this.attacked(strength)
		);

		this.addAutoEvent(
			this.model.inventory.consume.item,
			'change',
			() => {
				const item = this.model.inventory.consume.item.get();
				if (item) {
					const itemDef = item.itemDefinition.get();
					if (!itemDef) {
						console.error("No item definition! Cannot eat!");
						return;
					}
					itemDef.effects.forEach(
						(e) => {
							const stat = this.model.stats.findExpendableByDef(e.definitionId.get());
							if (!itemDef) {
								console.error("No stat definition found! Cannot eat!");
								return;
							}
							stat.restore(e.amount.get());
						}
					)
					this.model.inventory.consume.item.set(null);
				}
			}
		);

	}

	logAction(action) {
		this.save.logAction(`${this.model.name.get()}: ${action}`);
	}

	updateFaction() {
		this.model.faction.set(this.save.factions.getById(this.model.factionId.get()));
	}

	updateUnitType() {
		if (this.model.faction.isSet()) {
			const faction = this.model.faction.get();
			if (faction.race.isSet()) {
				const race = faction.race.get();
				this.model.unitType.set(race.unitTypes.getById(this.model.unitTypeId.get()));
			}
		}
	}

	attacked(attack) {
		const defense = this.model.stats.armor.effectiveValue.get();
		// todo: add fight mechanics
		const attackerRoll = NumberHelper.random(1, 10);
		const defenderRoll = NumberHelper.random(1, 10);
		const damage = Math.max(0, Math.round((attack + attackerRoll) - (defense + defenderRoll)));
		this.logAction(`hit for ${damage} health`);
		this.model.stats.health.consume(damage);
	}

}
