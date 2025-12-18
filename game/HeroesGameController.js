import GameController from "wgge/game/GameController";
import MenuItemModel from "wgge/game/menu/item/MenuItemModel";
import MenuModel from "wgge/game/menu/MenuModel";
import NullableNodeController from "wgge/core/controller/NullableNodeController";
import HeroesSaveGameController from "./savegame/HeroesSaveGameController";
import SaveGameGenerator from "./generator/SaveGameGenerator";

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

		// R - restart
		this.addAutoEvent(
			this.game.controls,
			'key-down-82',
			() => this.restartGame(),
			false
		);

		// K - kill/end
		this.addAutoEvent(
			this.game.controls,
			'key-down-75',
			() => this.model.saveGame.set(null),
			false
		);

		this.addChild(
			new NullableNodeController(
				this.game,
				this.model.saveGame,
				(m) => new HeroesSaveGameController(this.game, m)
			)
		);

	}

	showMainMenu() {
		const menu = new MenuModel('Menu');
		menu.items.add(new MenuItemModel('Restart', () => this.restartGame()));
		menu.items.add(new MenuItemModel('Continue', () => this.model.menu.set(null)));
		this.model.menu.set(menu);
	}

	restartGame() {
		this.model.saveGame.set(null);
		const generator = new SaveGameGenerator(this.game.resources, 100, 100);
		const savegame = generator.createSaveGame();
		this.model.saveGame.set(savegame);
	}

}
