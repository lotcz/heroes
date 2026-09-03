import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";
import CollectionController from "wgge/core/controller/CollectionController";
import NearbyMonsterGroupsController from "../../units/monsters/NearbyMonsterGroupsController";
import TileController from "../../map/tile/TileController";

export default class MapModeController extends ControllerBase {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(new CollectionController(game, this.model.travel.tiles, (m) => new TileController(game, m)));
		this.addChild(new NearbyMonsterGroupsController(game, this.model.travel.nearbyMonsters));

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
					this.model.map.mapView.zoom.multiply(0.5);
				} else {
					this.model.map.mapView.zoom.multiply(2);
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
				if (this.model.cursorItem.item.isSet()) {
					const tile = this.model.travel.visitingTile.get();
					tile.items.addItem(this.model.cursorItem.item.get());
					this.model.cursorItem.item.set(null);
					return;
				}
				const tileCoords = this.model.travel.mainViewOffsetPx.add(coords);
				const tilePosition = tileCoords.multiply(1 / this.model.travel.tiles.tileSizePx.get())
				const position = new Vector2(Math.floor(tilePosition.x), Math.floor(tilePosition.y));
				this.interactWith(position);
			}
		);

		// cursor over tile
		this.addAutoEvent(
			this.model.travel,
			'main-view-move',
			(coords) => {
				const tileCoords = this.model.travel.mainViewOffsetPx.add(coords);
				const tilePosition = tileCoords.multiply(1 / this.model.travel.tiles.tileSizePx.get())
				const position = new Vector2(Math.floor(tilePosition.x), Math.floor(tilePosition.y));
				this.model.cursorInfo.tile.set(this.model.travel.getTile(position));
			}
		);

		// set center to hero
		this.addAutoEvent(
			this.model.party.position,
			'change',
			() => {
				this.model.travel.tiles.viewCenterTile.set(this.model.party.position);
			},
			true
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

}
