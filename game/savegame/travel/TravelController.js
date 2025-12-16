import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class TravelController extends ControllerBase {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		// clear
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
		if (tile && tile.level.get() > 0 && !(tile.hasCity.get() || tile.hasMonster.get())) {
			this.model.hero.set(position);
		}
	}

}
