import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import TileInfoRenderer from "./TileInfoRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import BiotopeInfoRenderer from "./BiotopeInfoRenderer";
import ExpendableStatBarRenderer from "../../../../resources/stats/rendering/ExpendableStatBarRenderer";

export default class MapInfoBoxRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, element) {
		super(game, model, element);

		this.model = model;

	}

	activateInternal() {
		this.container = this.addElement('div', 'inner');

		const movement = DOMHelper.createElement(this.container, 'div', 'movement-info');
		this.addChild(
			new ExpendableStatBarRenderer(
				this.game,
				this.model.party.stats.movement,
				movement,
				false
			)
		);

		const biotopeInfo = DOMHelper.createElement(this.container, 'div', 'biotope-info-wrapper');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.travel.visitingBiotope,
				(biotope) => new BiotopeInfoRenderer(this.game, biotope, biotopeInfo)
			)
		);

		const riverName = DOMHelper.createElement(this.container, 'div', 'river-info');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.travel.visitingRiver,
				(river) => new DirtyValueRenderer(this.game, river.name, riverName)
			)
		);

		const tileInfo = DOMHelper.createElement(this.container, 'div', 'tile-info');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.travel.visitingTile,
				(tile) => new TileInfoRenderer(this.game, tile, tileInfo)
			)
		);

		const buttons = DOMHelper.createElement(this.container, 'div', 'row');
		DOMHelper.createElement(buttons, 'button', '', 'Explore', () => this.model.gameMode.set('explore'));

	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
	}

}
