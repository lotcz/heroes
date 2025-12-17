import ObjectModel from "wgge/core/model/ObjectModel";
import Vector2 from "wgge/core/model/vector/Vector2";

export default class CanvasViewModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	canvasSize;

	/**
	 * @type Vector2
	 */
	canvasCenter;

	constructor() {
		super();

		this.canvasSize = this.addProperty('canvasSize', new Vector2());
		this.canvasCenter = this.addProperty('canvasCenter', new Vector2());
		this.canvasSize.addOnChangeListener(() => this.updateCenter());
		this.updateCenter();
	}

	updateCenter() {
		this.canvasCenter.set(this.canvasSize.multiply(0.5));
	}

}
