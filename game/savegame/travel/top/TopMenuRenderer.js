import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import TileInfoRenderer from "./TileInfoRenderer";
import ExpendableStatBarRenderer from "../../../resources/stats/ExpendableStatBarRenderer";
import ExpendableStatNumericRenderer from "../../../resources/stats/ExpendableStatNumericRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class TopMenuRenderer extends DomRenderer {

	/**
	 * @type TravelModel
	 */
	model;

	constructor(game, model, element) {
		super(game, model, element);

		this.model = model;

	}

	activateInternal() {
		this.container = this.addElement('div', 'inner');

		const movement = DOMHelper.createElement(this.container, 'div', 'party-movement');
		this.addChild(new DirtyValueRenderer(this.game, this.model.partyStats.movement.currentValue, movement));

		const health = DOMHelper.createElement(this.container, 'div', 'health');
		const healthNumeric = DOMHelper.createElement(health, 'div', 'health-numeric');
		this.addChild(new ExpendableStatNumericRenderer(this.game, this.model.partyStats.health, healthNumeric));

		const healthBar = DOMHelper.createElement(health, 'div', 'health-bar');
		this.addChild(new ExpendableStatBarRenderer(this.game, this.model.partyStats.health, healthBar));

		const land = DOMHelper.createElement(this.container, 'div', 'biotope-info');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.visitingBiotope,
				(biotope) => new DirtyValueRenderer(this.game, biotope.name, land)
			)
		);

		const riverName = DOMHelper.createElement(this.container, 'div', 'river-info');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.visitingRiver,
				(river) => new DirtyValueRenderer(this.game, river.name, riverName)
			)
		);

		const tileInfo = DOMHelper.createElement(this.container, 'div', 'tile-info');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.visitingTile,
				(tile) => new TileInfoRenderer(this.game, tile, tileInfo)
			)
		);
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
	}

}
