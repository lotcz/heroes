import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";
import CollectionController from "wgge/core/controller/CollectionController";
import TileController from "./map/tile/TileController";
import PartyController from "../party/PartyController";
import MonsterGroupController from "../monsters/MonsterGroupController";
import LocationController from "../location/LocationController";

const TOP_MENU_HEIGHT = 35;
const MAP_WIDTH = 300;
const MAP_MARGIN = 10;

export default class TravelController extends ControllerBase {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(new PartyController(game, this.model.party));
		this.addChild(new CollectionController(game, this.model.travel.tiles, (m) => new TileController(game, m)));
		this.addChild(new CollectionController(game, this.model.travel.monsters, (m) => new MonsterGroupController(game, m)));
		this.addChild(new CollectionController(game, this.model.travel.locations, (m) => new LocationController(game, m)));

		// T - clear fog of war
		this.addAutoEvent(
			this.game.controls,
			'key-down-84',
			() => this.model.travel.tiles.discoverAll(),
			false
		);

		this.addAutoEvent(
			this.model,
			'zoom',
			(zoom) => {
				if (zoom > 0) {
					this.model.travel.tiles.tileSizePx.multiply(0.5);
				} else {
					this.model.travel.tiles.tileSizePx.multiply(2);
				}

			}
		);

		// move up
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-38',
				'key-down-87',
				'key-down-104'
			],
			() => this.movePartyBy(new Vector2(0, -1)),
			false
		);

		// mode down
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-40',
				'key-down-83',
				'key-down-88',
				'key-down-98'
			],
			() => this.movePartyBy(new Vector2(0, 1)),
			false
		);

		// move left
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-37',
				'key-down-65',
				'key-down-100'
			],
			() => this.movePartyBy(new Vector2(-1, 0)),
			false
		);

		// move right
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-39',
				'key-down-68',
				'key-down-102'
			],
			() => this.movePartyBy(new Vector2(1, 0)),
			false
		);

		// move up-left
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-81',
				'key-down-103'
			],
			() => this.movePartyBy(new Vector2(-1, -1)),
			false
		);

		// move up-right
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-69',
				'key-down-105'
			],
			() => this.movePartyBy(new Vector2(1, -1)),
			false
		);

		// move down-left
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-90',
				'key-down-97'
			],
			() => this.movePartyBy(new Vector2(-1, 1)),
			false
		);

		// move down-right
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-67',
				'key-down-99'
			],
			() => this.movePartyBy(new Vector2(1, 1)),
			false
		);

		// move on click
		this.addAutoEvent(
			this.model.travel,
			'main-view-click',
			(coords) => {
				const tileCoords = this.model.travel.mainViewOffsetPx.add(coords);
				const tilePosition = tileCoords.multiply(1 / this.model.travel.tiles.tileSizePx.get())
				const position = new Vector2(Math.floor(tilePosition.x), Math.floor(tilePosition.y));
				this.interactWith(position);
			},
			false
		);

		// set center to hero
		this.addAutoEventMultiple(
			[this.model.party.position, this.model.party.renderingOffset],
			'change',
			() => this.model.travel.tiles.viewCenterTile.set(this.model.party.position.add(this.model.party.renderingOffset)),
			true
		);

		// monsters finished moving - start turn
		this.addAutoEvent(
			this.model.travel.monsters.isMonsterMoving,
			'change',
			() => {
				this.checkStartTurn();
			}
		);

		// party finished moving - end turn
		this.addAutoEvent(
			this.model.party.isMoving,
			'change',
			() => {
				this.checkEndTurn();
			}
		);

		// on action - end turn
		this.addAutoEvent(
			this.model.party.stats.movement.currentValue,
			'change',
			() => {
				this.checkEndTurn();
			}
		);

		// on start turn - also start for party
		this.addAutoEvent(
			this.model,
			'start-turn',
			() => {
				this.model.party.triggerEvent('start-turn');
			}
		);

		// informative messages
		this.addAutoEvent(
			this.model.travel.visitingTile,
			'change',
			() => {
				const tile = this.model.travel.visitingTile.get();
				if (!tile) return;

				if (tile.location.isSet()) {
					this.model.journal.actionLog.add(`Visited ${tile.location.get().name.get()} of ${tile.location.get().faction.get().name.get()}`);
				}

				tile.items.forEach(
					(item) => {
						this.model.party.inventory.addItem(item);
					}
				);
				tile.items.reset();
			}
		);

		this.addAutoEvent(
			this.model,
			'select-character',
			(ch) => this.model.travel.selectedCharacter.set(ch)
		);

		this.addAutoEvent(
			this.model,
			'select-slot',
			(s) => {
				if (s !== null) {
					if (this.model.travel.selectedItemSlot.isSet()) {
						const selectedSlot = this.model.travel.selectedItemSlot.get();
						const item = selectedSlot.item.get();
						selectedSlot.item.set(s.item.get());
						s.item.set(item);
						this.model.travel.selectedItemSlot.set(null);
						return;
					}
					if (s.isEmpty()) s = null;
				}
				this.model.travel.selectedItemSlot.set(s);
			}
		);

	}

	interactWith(targetPosition) {
		// send event to PartyController
		this.model.party.triggerEvent('interact-with', targetPosition);
	}

	movePartyBy(direction) {
		this.interactWith(this.model.party.position.add(direction));
	}

	checkEndTurn() {
		const partyHasMovement = this.model.party.stats.movement.currentValue.get() > 0;
		const anyoneMoving = this.model.travel.monsters.isMonsterMoving.get() || this.model.party.isMoving.get();
		if (!(partyHasMovement || anyoneMoving)) {
			console.log('nobody moving, ending turn');
			this.model.triggerEvent('end-turn');
			this.checkStartTurn();
		}
	}

	checkStartTurn() {
		const partyHasMovement = this.model.party.stats.movement.currentValue.get() > 0;
		const anyoneMoving = this.model.travel.monsters.isMonsterMoving.get() || this.model.party.isMoving.get();
		if (!(partyHasMovement || anyoneMoving)) {
			console.log('nobody moving, starting turn');
			this.model.triggerEvent('start-turn');
		}
	}

}
