import GameController from "wgge/game/GameController";
import MenuItemModel from "wgge/game/menu/item/MenuItemModel";
import MenuModel from "wgge/game/menu/MenuModel";
import NullableNodeController from "wgge/core/controller/NullableNodeController";
import TileBoardController from "./tiles/TileBoardController";
import TileBoardModel from "./tiles/TileBoardModel";

export default class HeroesGameController extends GameController {

	/**
	 * @type HeroesGameModel
	 */
	model;

	constructor(model) {
		super(model, model);

		this.model = model;

		this.addAutoEvent(
			this.model.controls,
			'esc-key',
			() => {
				if (this.model.menu.isSet()) {
					this.hideMenu();
				} else {
					this.showMainMenu();
				}
			}
		);

		this.addChild(
			new NullableNodeController(
				this.game,
				this.model.saveGame,
				(m) => new TileBoardController(this.game, m)
			)
		);

	}

	afterActivatedInternal() {
		super.afterActivatedInternal();
		//this.showMainMenu();
		//this.model.editor.isVisible.set(false);
	}

	showMainMenu() {
		const menu = new MenuModel('Menu');
		menu.items.add(new MenuItemModel('Restart', () => this.model.saveGame.set(new TileBoardModel())));
		menu.items.add(new MenuItemModel('Continue', () => this.model.menu.set(null)));
		this.model.menu.set(menu);
	}

	async loadResourcesFromStorage() {
		await super.loadResourcesFromStorage();
		this.model.saveGame.set(new TileBoardModel());
	}

}
