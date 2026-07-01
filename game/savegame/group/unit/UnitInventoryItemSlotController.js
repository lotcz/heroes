import ControllerBase from "wgge/core/controller/ControllerBase";

export default class UnitInventoryItemSlotController extends ControllerBase {

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
			() => this.updateStats(),
			true
		);

	}

	updateStats() {
		if (this.effects.length > 0) {
			this.effects.forEach((e) => this.stats.effects.remove(e));
			this.effects = [];
		}
		if (!this.model.item.isEmpty()) {
			const item = this.model.item.get();
			const itemDef = item.itemDefinition.get();
			itemDef.effects.forEach((e) => {
				const effect = e.clone();
				this.effects.push(effect);
				this.stats.effects.add(effect);
			});
		}
	}

}
