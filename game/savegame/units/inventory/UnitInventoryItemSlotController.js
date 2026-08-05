import ItemSlotController from "../../inventory/slot/ItemSlotController";

export default class UnitInventoryItemSlotController extends ItemSlotController {

	/**
	 * @type ItemSlotModel
	 */
	model;

	/**
	 * @type UnitStatsModel
	 */
	stats;

	constructor(game, model, stats) {
		super(game, model);

		this.model = model;
		this.stats = stats;
		this.effects = [];

		this.addAutoEvent(
			this.model.item,
			'change',
			() => this.updateStats()
		);

	}

	afterActivatedInternal() {
		// on init, this needs to run after child controllers activated
		this.updateStats();
	}

	updateStats() {
		if (this.effects.length > 0) {
			this.effects.forEach((e) => this.stats.effects.remove(e));
			this.effects = [];
		}
		if (!this.model.item.isEmpty()) {
			const item = this.model.item.get();
			const itemDef = item.itemDefinition.get();
			if (!itemDef) {
				console.error('Item has no definition, cannot apply effects');
				return;
			}
			itemDef.effects.forEach((e) => {
				const effect = e.clone();
				this.effects.push(effect);
				this.stats.effects.add(effect);
			});
		}
	}

}
