import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import DOMHelper from "wgge/core/helper/DOMHelper";
import ImageDomRenderer from "wgge/core/renderer/dom/ImageDomRenderer";
import DirtyValueRenderer from "wgge/core/renderer/dom/DirtyValueRenderer";
import CollectionRenderer from "wgge/core/renderer/generic/CollectionRenderer";
import StatEffectRenderer from "../../../resources/stats/effects/StatEffectRenderer";

export default class CursorInfoItemRenderer extends DomRenderer {

	/**
	 * @type ItemModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

	}

	activateInternal() {
		this.wrapper = this.addElement('div', 'cursor-info-item');
		const itemDef = this.model.itemDefinition.get();
		if (!itemDef) {
			console.error('Item definition empty! Cannot show cursor info', this.model.itemDefinitionId.get());
			return;
		}
		const name = DOMHelper.createElement(this.wrapper, 'div', 'name');
		this.addChild(new DirtyValueRenderer(this.game, itemDef.name, name));
		const image = DOMHelper.createElement(this.wrapper, 'div', 'picture');
		this.addChild(new ImageDomRenderer(this.game, itemDef.image, image));
		const effects = DOMHelper.createElement(this.wrapper, 'div', 'effects');
		this.addChild(
			new CollectionRenderer(
				this.game,
				itemDef.effects,
				(m) => new StatEffectRenderer(this.game, m, effects))
		)
	}

	deactivateInternal() {
		this.resetChildren();
		DOMHelper.destroyElement(this.wrapper);
	}

}
