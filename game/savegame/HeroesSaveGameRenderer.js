import DomRenderer from "wgge/core/renderer/dom/DomRenderer";
import TravelRenderer from "./travel/TravelRenderer";

export default class HeroesSaveGameRenderer extends DomRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.addChild(new TravelRenderer(game, model, dom));
	}

}
