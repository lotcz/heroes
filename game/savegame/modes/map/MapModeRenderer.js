import GameModeRendererBase from "../GameModeRendererBase";
import MapMainViewRenderer from "./MapMainViewRenderer";
import MapInfoBoxRenderer from "./info/MapInfoBoxRenderer";

export default class MapModeRenderer extends GameModeRendererBase {

	constructor(game, model, dom) {
		super(game, model, dom);


	}

	activateInternal() {
		super.activateInternal();

		this.addChild(new MapMainViewRenderer(this.game, this.model, this.mainCanvas));
		this.addChild(new MapInfoBoxRenderer(this.game, this.model, this.infoBoxWrapper));
	}


}
