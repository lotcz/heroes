import GameModeRendererBase from "../GameModeRendererBase";
import ExploreMainViewRenderer from "./ExploreMainViewRenderer";
import ExploreInfoBoxRenderer from "./info/ExploreInfoBoxRenderer";

export default class ExploreModeRenderer extends GameModeRendererBase {

	constructor(game, model, dom) {
		super(game, model, dom);

	}

	activateInternal() {
		super.activateInternal();

		this.addChild(new ExploreMainViewRenderer(this.game, this.model, this.mainCanvas));
		this.addChild(new ExploreInfoBoxRenderer(this.game, this.model, this.infoBoxWrapper));
	}


}
