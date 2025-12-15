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


		this.addAutoEvent(
			this.game.controls,
			'key-down-82',
			() => this.model.restart(),
			true
		);

		this.addAutoEvent(
			this.game.controls,
			'key-down-38',
			() => this.model.hero.set(this.model.hero.add(new Vector2(0, -1))),
			true
		);

		this.addAutoEvent(
			this.game.controls,
			'key-down-40',
			() => this.model.hero.set(this.model.hero.add(new Vector2(0, 1))),
			true
		);

		this.addAutoEvent(
			this.game.controls,
			'key-down-37',
			() => this.model.hero.set(this.model.hero.add(new Vector2(-1, 0))),
			true
		);

		this.addAutoEvent(
			this.game.controls,
			'key-down-39',
			() => this.model.hero.set(this.model.hero.add(new Vector2(1, 0))),
			true
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



}
