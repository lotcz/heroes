import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";
import CollectionController from "wgge/core/controller/CollectionController";
import TileController from "./tile/TileController";
import PartyController from "../party/PartyController";
import MonsterGroupController from "../monsters/MonsterGroupController";

const TOP_MENU_HEIGHT = 35;
const MAP_WIDTH = 300;
const MAP_MARGIN = 10;

export default class TravelController extends ControllerBase {

	/**
	 * @type TravelModel
	 */
	model;

	/**
	 * @type ActionLogModel
	 */
	actionLog;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.actionLog = this.game.saveGame.get().journal.actionLog;

		this.addChild(new PartyController(game, this.model.party));
		this.addChild(new CollectionController(game, model.tiles, (m) => new TileController(game, m)));
		this.addChild(new CollectionController(game, model.monsters, (m) => new MonsterGroupController(game, m)));

		// canvas sizes
		this.addAutoEventMultiple(
			[this.game.viewBoxSize, this.model.tiles.boardTotalSizePx],
			'change',
			() => {
				this.model.mainView.canvasSize.set(
					Math.round(this.game.viewBoxSize.x - MAP_WIDTH - (2 * MAP_MARGIN)),
					this.game.viewBoxSize.y - TOP_MENU_HEIGHT
				);
				this.model.mapView.canvasSize.set(
					MAP_WIDTH,
					this.model.tiles.boardTotalSizePx.y === 0 ? 0
						: Math.round(MAP_WIDTH / (this.model.tiles.boardTotalSizePx.x / this.model.tiles.boardTotalSizePx.y))
				);
				this.actionLog.add(`Resized to ${this.game.viewBoxSize.toString()} tile: ${this.model.tiles.tileSize.x}`);
			},
			true
		);

		// T - clear fog of war
		this.addAutoEvent(
			this.game.controls,
			'key-down-84',
			() => this.model.tiles.discoverAll(),
			false
		);

		this.addAutoEvent(
			this.model,
			'zoom',
			(zoom) => {
				if (zoom > 0) {
					this.model.tiles.tileSizePx.multiply(0.5);
				} else {
					this.model.tiles.tileSizePx.multiply(2);
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
			this.game.controls,
			'left-click',
			(coords) => {
				const actualViewCoords = coords.sub(new Vector2(0, TOP_MENU_HEIGHT));
				if (!actualViewCoords.isInside(new Vector2(), this.model.mainView.canvasSize)) return;
				const tileCoords = this.model.mainViewOffsetPx.add(actualViewCoords);
				const tilePosition = tileCoords.multiply(1 / this.model.tiles.tileSizePx.get())
				const position = new Vector2(Math.floor(tilePosition.x), Math.floor(tilePosition.y));
				this.interactWith(position);
			},
			false
		);

		// set center to hero
		this.addAutoEventMultiple(
			[this.model.party.position, this.model.party.renderingOffset],
			'change',
			() => this.model.tiles.viewCenterTile.set(this.model.party.position.add(this.model.party.renderingOffset)),
			true
		);

		// monsters finished moving - start turn
		this.addAutoEvent(
			this.model.monsters.isMonsterMoving,
			'change',
			() => {
				if (!this.model.monsters.isMonsterMoving.get()) {
					this.model.triggerEvent('start-turn');
				}
			}
		);

		// on action - end turn
		this.addAutoEvent(
			this.model.party.stats.movement.currentValue,
			'change',
			() => {
				if (this.model.party.stats.movement.currentValue.get() <= 0) {
					this.model.triggerEvent('end-turn');
					// when there are no moving monsters, start new turn immediately
					if (!this.model.monsters.isMonsterMoving.get()) {
						this.model.triggerEvent('start-turn');
					}
				}
			}
		);

		// on start turn - restore movement
		this.addAutoEvent(
			this.model,
			'start-turn',
			() => {
				this.model.party.stats.movement.restore();
			}
		);

		// informative messages
		this.addAutoEvent(
			this.model.visitingTile,
			'change',
			() => {
				const tile = this.model.visitingTile.get();
				if (!tile) return;

				if (tile.location.isSet()) {
					this.actionLog.add(`Visited ${tile.location.get().name.get()} of ${tile.location.get().faction.get().name.get()}`);
				}
				if (tile.isRiver()) {
					this.actionLog.add(`River ${tile.rivers.strength.get()}, height ${tile.height.get()}`);
				}
				if (tile.isStream()) {
					this.actionLog.add(`Stream ${tile.rivers.strength.get()}, height ${tile.height.get()}`);
				}
				if (tile.isLake()) {
					this.actionLog.add(`Lake, height ${tile.height.get()}`);
				}
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

}
