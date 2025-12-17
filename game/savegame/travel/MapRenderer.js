import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";
import Vector2 from "wgge/core/model/vector/Vector2";
import Dictionary from "wgge/core/Dictionary";

export default class MapRenderer extends CanvasRenderer {

	/**
	 * @type HeroesSaveGameModel
	 */
	model;

	/**
	 * @type BiotopesResource
	 */
	biotopes;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;
		this.biotopes = this.game.resources.biotopes;
		this.biotopesTextures = new Dictionary();

		this.tileSize = new Vector2();

	}

	activateInternal() {
		this.biotopes.forEach(
			(biotope) => {
				this.game.assets.loadImage(
					biotope.texture.get(),
					(texture) => this.biotopesTextures.set(biotope.id.get(), this.context2d.createPattern(texture, 'repeat'))
				);
			}
		);
	}

	renderTile(tile) {
		if (tile.discovered.equalsTo(0)) return;

		const tileStart = new Vector2(
			tile.position.x * this.tileSize.x,
			tile.position.y * this.tileSize.y
		);

		if (tile.location.isSet()) {
			this.drawRect(tileStart, this.tileSize, 'yellow');
			return;
		}

		const texture = this.biotopesTextures.get(tile.biotopeId.get());
		if (texture) {
			this.drawRect(tileStart, this.tileSize, texture);
		}


		/*
				if (tile.precipitationLevel.get() === 0) {
					this.drawCircle(
						tileStart.add(this.tileSize.multiply(0.5)),
						this.tileSize.x/2,
						`red`
					);
				} else if (tile.precipitationLevel.get() === 2) {
					this.drawCircle(
						tileStart.add(this.tileSize.multiply(0.5)),
						this.tileSize.x/2,
						`blue`
					);
				}
		*/

	}

	renderInternal() {
		const tileSide = Math.min(
			this.model.travelView.map.canvasSize.x / this.model.boardSize.x,
			this.model.travelView.map.canvasSize.y / this.model.boardSize.y
		);
		this.tileSize.set(tileSide, tileSide);

		// clear
		this.context2d.clearRect(0, 0, this.model.travelView.map.canvasSize.x, this.model.travelView.map.canvasSize.y);

		// render tiles
		this.model.tiles.forEach((tile) => this.renderTile(tile));

		// render hero
		const HERO_SIZE = 5;
		const tileHero = new Vector2(
			this.model.hero.x * this.tileSize.x,
			this.model.hero.y * this.tileSize.y
		).add(this.tileSize.multiply(0.5));

		this.drawCircle(
			tileHero,
			HERO_SIZE,
			'yellow',
			{width: 1, color: 'red'}
		);

	}

}
