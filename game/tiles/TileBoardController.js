import ControllerBase from "wgge/core/controller/ControllerBase";
import Vector2 from "wgge/core/model/vector/Vector2";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class TileBoardController extends ControllerBase {

	/**
	 * @type TileBoardModel
	 */
	model;

	/**
	 * @type BiotopesModel
	 */
	biotopes;

	constructor(game, model) {
		super(game, model);

		this.model = model;
		this.biotopes = this.game.resources.biotopes;

		// restart
		this.addAutoEvent(
			this.game.controls,
			'key-down-82',
			() => this.randomizeTileBoard(),
			true
		);

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

	randomizeTileBoard() {
		this.model.fractal();

		this.model.tiles.forEach(
			(t) => {
				if (t.biotopeId.isEmpty()) {
					const biotope = this.biotopes.findFirstByLevel(t.level.get());
					if (biotope) t.biotopeId.set(biotope.id.get());
				}
			}
		);

		const landTiles = this.model.tiles.filter((t) => t.height.get() > -0.5);
		const landTilesPopulated = landTiles.filter((t) => t.population.get() > 0);
		if (landTilesPopulated.length > 0) {
			for (let i = 0; i < 10; i++) {
				const tile = ArrayHelper.random(landTilesPopulated);
				tile.hasCity.set(true);
			}
		}
		const landTilesUnpopulated = landTiles.filter((t) => t.population.get() <= 0);
		if (landTilesPopulated.length > 0) {
			for (let i = 0; i < 10; i++) {
				const tile = ArrayHelper.random(landTilesUnpopulated);
				tile.hasMonster.set(true);
			}
		}
		const heroTile = ArrayHelper.random(landTiles);
		this.model.hero.set(heroTile.position);
	}

	moveHero(direction) {
		const position = this.model.hero.add(direction).round();
		const tile = this.model.tiles.find((t) => t.position.equalsTo(position));
		if (tile && tile.height.get() >= -0.5 && !(tile.hasCity.get() || tile.hasMonster.get())) {
			this.model.hero.set(position);
		}
	}

}
