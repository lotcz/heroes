import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";

export default class TileBoardController extends ControllerBase {

	/**
	 * @type TileBoardModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		// restart
		this.addAutoEvent(
			this.game.controls,
			'key-down-82',
			() => this.model.restart(),
			true
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

		this.addAutoEvent(
			this.model.hero,
			'change',
			() => this.model.viewCenterTile.set(this.model.hero),
			true
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
	}

	moveHero(direction) {
		const position = this.model.hero.add(direction).round();
		const tile = this.model.tiles.find((t) => t.position.equalsTo(position));
		if (tile && tile.height.get() >= -0.5 && tile.height.get() <= 2.5 && !(tile.hasCity.get() || tile.hasMonster.get())) {
			this.model.hero.set(position);
		}
	}

}
