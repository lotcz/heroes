import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import NullableNodeRenderer from "wgge/core/renderer/generic/NullableNodeRenderer";
import TileInfoRenderer from "./TileInfoRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";

export default class InfoBoxRenderer extends DomRenderer {

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
		
		const land = DOMHelper.createElement(this.container, 'div', 'biotope-info');
		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.travel.visitingBiotope,
				(biotope) => new DirtyValueRenderer(this.game, biotope.name, land)
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
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
	}

}
