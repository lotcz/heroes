import ControllerBase from "wgge/core/controller/ControllerBase";
import CollectionController from "wgge/core/controller/CollectionController";
import FactionController from "./faction/FactionController";
import PartyController from "./units/party/PartyController";
import LocationController from "./location/LocationController";
import SwitchController from "wgge/core/controller/SwitchController";
import MapModeController from "./modes/map/MapModeController";
import ExploreModeController from "./modes/explore/ExploreModeController";

export default class HeroesSaveGameController extends ControllerBase {

	/**
	 * @type HeroesGameModel
	 */
	game;

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.game = game;
		this.model = model;

		this.addChild(new CollectionController(game, model.factions, (m) => new FactionController(game, m)));
		this.addChild(new CollectionController(game, this.model.locations, (m) => new LocationController(game, m)));
		this.addChild(new PartyController(game, this.model.party));

		// MAIN
		this.addChild(
			new SwitchController(
				this.game,
				this.model,
				this.model.gameMode,
				{
					'map': () => new MapModeController(this.game, this.model),
					'explore': () => new ExploreModeController(this.game, this.model)
				}
			)
		);

		this.addAutoEvent(
			this.model,
			'select-character',
			(ch) => {
				if (ch && this.model.cursorItem.item.isSet()) {
					ch.inventory.items.addItem(this.model.cursorItem.item.get());
					this.model.cursorItem.item.set(null);
					return;
				}
				if (this.model.selectedCharacter.equalsTo(ch)) {
					this.model.characterSheetOpen.invert();
				} else {
					this.model.selectedCharacter.set(ch);
				}
			}
		);

		this.addAutoEvent(
			this.model,
			'close-sheet',
			() => {
				this.model.characterSheetOpen.set(false);
			}
		);

		this.addAutoEvent(
			this.model,
			'select-slot',
			(slot) => {
				const item = this.model.cursorItem.item.get();
				if (slot.acceptsItem(item)) {
					this.model.cursorItem.item.set(slot.item.get());
					slot.item.set(item);
				}
			}
		);

	}

}
