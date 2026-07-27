import ControllerBase from "wgge/core/controller/ControllerBase";
import UnitInventoryController from "./inventory/UnitInventoryController";
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

		this.addAutoEvent(
			this.model.stats,
			'death',
			() => {
				this.logAction(`${this.model.name.get()} of ${this.model.faction.get().name.get()} died`);

				const unitType = this.model.unitType.get();
				if (!unitType) {
					console.error('No unit type! Cannot drop loot!');
					return
				}
				unitType.loot.forEach((item) => this.model.triggerEvent('drop-item', item));
				this.model.dropAllItems();
				this.model.removeMyself();
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

}
