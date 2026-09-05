import GameController from "wgge/game/GameController";
import MenuItemModel from "wgge/game/menu/item/MenuItemModel";
import MenuModel from "wgge/game/menu/MenuModel";
import NullableNodeController from "wgge/core/controller/NullableNodeController";
import HeroesSaveGameController from "./savegame/HeroesSaveGameController";
import HeroesSaveGameModel from "./savegame/HeroesSaveGameModel";

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
			true
		);

		// K - kill/end
		this.addAutoEvent(
			this.game.controls,
			'key-down-75',
			() => {
				this.model.message.set('No game');
				this.model.saveGame.set(null);
			}
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
		if (this.model.saveGame.isSet()) {
			menu.items.add(new MenuItemModel('Continue', () => this.hideMenu()));
		}
		this.model.menu.set(menu);
	}

	restartGame() {
		this.model.saveGame.set(null);
		this.hideMenu();
		this.model.message.set('Creating game...');
		const worker = new Worker(new URL('./generator/generator-worker.js', import.meta.url), {type: 'module'});

		worker.onmessage = (e) => {
			const savegame = new HeroesSaveGameModel();
			savegame.restoreState(e.data);
			this.model.saveGame.set(savegame);
			worker.terminate();
		};

		worker.onerror = (err) => {
			worker.terminate();
			console.error(err);
		};

		worker.postMessage({
			width: 50,
			height: 50
		});
	}

}
