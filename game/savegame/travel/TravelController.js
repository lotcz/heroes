import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";

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

		// canvas sizes
		this.addAutoEventMultiple(
			[this.game.viewBoxSize, this.model.boardTotalSizePx],
			'change',
			() => {
				this.model.travelView.main.canvasSize.set(
					Math.round(this.game.viewBoxSize.x - MAP_WIDTH - 2 * MAP_MARGIN),
					this.game.viewBoxSize.y
				);
				this.model.travelView.map.canvasSize.set(
					MAP_WIDTH,
					this.model.boardTotalSizePx.y === 0 ? 0
						: Math.round(MAP_WIDTH / (this.model.boardTotalSizePx.x / this.model.boardTotalSizePx.y))
				);
			},
			true
		);

		// clear fog of war
		this.addAutoEvent(
			this.game.controls,
			'key-down-67',
			() => this.model.clear(),
			false
		);

		this.addAutoEvent(
			this.game.controls,
			'zoom',
			(zoom) => {
				if (zoom > 0) {
					this.model.tileSizePx.multiply(0.5);
				} else {
					this.model.tileSizePx.multiply(2);
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
			() => this.moveHero(new Vector2(0, -1)),
			false
		);

		// mode down
		this.addAutoEvents(
			this.game.controls,
			[
				'key-down-40',
				'key-down-83',
				'key-down-98'
			],
			() => this.moveHero(new Vector2(0, 1)),
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
			() => this.moveHero(new Vector2(-1, 0)),
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
			() => this.moveHero(new Vector2(1, 0)),
			false
		);

		// set center to hero
		this.addAutoEvent(
			this.model.hero,
			'change',
			() => this.model.viewCenterTile.set(this.model.hero),
			true
		);

	}

	moveHero(direction) {
		const position = this.model.hero.add(direction).round();
		const tile = this.model.tiles.find((t) => t.position.equalsTo(position));
		if (tile && tile.heightLevel.get() > 0 && !(tile.location.isSet())) {
			this.model.hero.set(position);
		}
	}

}
