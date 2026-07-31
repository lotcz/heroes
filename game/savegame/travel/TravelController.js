import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";
import CollectionController from "wgge/core/controller/CollectionController";
import TileController from "./map/tile/TileController";
import NearbyMonsterGroupController from "../units/monsters/NearbyMonsterGroupController";

export default class TravelController extends ControllerBase {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(new CollectionController(game, this.model.travel.tiles, (m) => new TileController(game, m)));
		this.addChild(new CollectionController(game, this.model.travel.nearbyMonsters, (m) => new NearbyMonsterGroupController(game, m)));

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
				if (this.model.selectedItem.item.isSet()) {
					const tile = this.model.visitingTile.get();
					tile.items.addItem(this.model.selectedItem.item.get());
					this.model.selectedItem.item.set(null);
					return;
				}
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
			this.model.travel.nearbyMonsters.isMonsterMoving,
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

		// party moved to tile
		this.addAutoEvent(
			this.model.travel.visitingTile,
			'change',
			() => {
				const tile = this.model.travel.visitingTile.get();
				if (!tile) return;

				// regroup items on ground
				tile.items.groupItemsToStart();

				// notify of location
				if (tile.location.isSet()) {
					this.model.journal.actionLog.add(`Visited ${tile.location.get().name.get()} of ${tile.location.get().faction.get().name.get()}`);
				}

				// drink
				if (tile.isLake() || tile.isRiver() || tile.isStream()) {
					this.model.party.members.forEach(
						(member) => {
							member.stats.thirst.restore();
						}
					)
				}
			}
		);

		// take all items
		this.addAutoEvent(
			this.model,
			'take-items-from-ground',
			() => {
				const tile = this.model.travel.visitingTile.get();
				if (!tile) return;

				const member = this.model.selectedCharacter.isSet() ?
					this.model.selectedCharacter.get() :
					this.model.party.members.first();

				tile.items.forEach(
					(slot) => {
						member.inventory.items.addItem(slot.item.get());
					}
				);
				tile.items.reset();
			}
		);

		this.addAutoEvent(
			this.model,
			'select-character',
			(ch) => {
				if (ch && this.model.selectedItem.item.isSet()) {
					ch.inventory.items.addItem(this.model.selectedItem.item.get());
					this.model.selectedItem.item.set(null);
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
				const item = this.model.selectedItem.item.get();
				if (slot.acceptsItem(item)) {
					this.model.selectedItem.item.set(slot.item.get());
					slot.item.set(item);
				}
			}
		);

	}

	interactWith(targetPosition) {
		if (this.model.characterSheetOpen.get()) {
			this.model.characterSheetOpen.set(false);
			return;
		}
		this.model.party.triggerEvent('interact-with', targetPosition);
	}

	movePartyBy(direction) {
		this.interactWith(this.model.party.position.add(direction));
	}

	checkEndTurn() {
		const partyHasMovement = this.model.party.stats.movement.currentValue.get() > 0;
		const anyoneMoving = this.model.travel.nearbyMonsters.isMonsterMoving.get() || this.model.party.isMoving.get();
		if (!(partyHasMovement || anyoneMoving)) {
			this.model.triggerEvent('end-turn');
			this.checkStartTurn();
		}
	}

	checkStartTurn() {
		const partyHasMovement = this.model.party.stats.movement.currentValue.get() > 0;
		const anyoneMoving = this.model.travel.nearbyMonsters.isMonsterMoving.get() || this.model.party.isMoving.get();
		if (!(partyHasMovement || anyoneMoving)) {
			this.model.triggerEvent('start-turn');
		}
	}

}
