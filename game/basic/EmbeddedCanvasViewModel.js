import Vector2 from "wgge/core/model/vector/Vector2";
import CanvasViewModel from "./CanvasViewModel";
import FloatValue from "wgge/core/model/value/FloatValue";

export default class EmbeddedCanvasViewModel extends CanvasViewModel {

	/**
	 * @type CanvasViewModel
	 */
	content;

	/**
	 * @type Vector2
	 */
	centerOffset;

	/**
	 * @type FloatValue
	 */
	zoom;

	/**
	 * @type CanvasViewModel
	 */
	contentAfterZoom;

	/**
	 * @type Vector2
	 */
	centerOffsetAfterZoom;

	constructor() {
		super();

		this.content = this.addProperty('content', new CanvasViewModel());
		this.centerOffset = this.addProperty('centerOffset', new Vector2());
		this.zoom = this.addProperty('zoom', new FloatValue(1));
		this.contentAfterZoom = this.addProperty('contentAfterZoom', new CanvasViewModel());
		this.centerOffsetAfterZoom = this.addProperty('centerOffsetAfterZoom', new Vector2());

		this.zoom.addOnChangeListener(() => this.updateZoom());
		this.content.canvasSize.addOnChangeListener(() => this.updateZoom());
		this.centerOffset.addOnChangeListener(() => this.updateZoom());

	}

	updateZoom() {
		this.contentAfterZoom.canvasSize.set(this.content.canvasSize.multiply(this.zoom.get()));
		this.centerOffsetAfterZoom.set(this.centerOffset.multiply(this.zoom.get()));
	}

	getContentPosition(wrapperPosition) {
		return this.content.canvasCenter.add(wrapperPosition.sub(this.canvasCenter).multiply(1 / this.zoom.get()));
	}

	getWrapperPosition(contentPosition) {
		return this.canvasCenter.add(contentPosition.sub(this.content.canvasCenter).multiply(this.zoom.get()));
	}

	getRenderingStart() {
		const contentStart = this.getWrapperPosition(new Vector2());
		return new Vector2(
			Math.max(0, contentStart.x),
			Math.max(0, contentStart.y)
		).round();
	}

	getRenderingEnd() {
		const contentEnd = this.getWrapperPosition(this.content.canvasSize);
		return new Vector2(
			Math.min(this.canvasSize.x, contentEnd.x),
			Math.min(this.canvasSize.y, contentEnd.y)
		).round();
	}

}
