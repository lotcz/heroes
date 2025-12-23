import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";
import Vector2 from "wgge/core/model/vector/Vector2";
import Dictionary from "wgge/core/Dictionary";

export default class MapRenderer extends CanvasRenderer {

	/**
	 * @type TravelModel
	 */
	model;

	/**
	 * @type TileDecorationsResource
	 */
	biotopes;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;
		this.biotopes = this.game.resources.biotopes;
		this.save = this.game.saveGame.get();

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

		const texture = this.biotopesTextures.get(tile.biotopeId.get());
		if (texture) {
			this.drawRect(tileStart, this.tileSize, texture);
		}

	}

	renderLocation(location) {
		const LOCATION_SIZE = 3;
		const tileLocation = new Vector2(location.position.x * this.tileSize.x, location.position.y * this.tileSize.y)
			.add(this.tileSize.multiply(0.5));

		this.drawCircle(
			tileLocation,
			LOCATION_SIZE,
			location.faction.get().color.get(),
			{width: 1, color: 'white'}
		);
	}

	renderInternal() {
		const tileSide = Math.min(
			this.model.mapView.canvasSize.x / this.model.tiles.boardSize.x,
			this.model.mapView.canvasSize.y / this.model.tiles.boardSize.y
		);
		this.tileSize.set(tileSide, tileSide);

		// clear
		this.context2d.clearRect(0, 0, this.model.mapView.canvasSize.x, this.model.mapView.canvasSize.y);

		// render tiles
		this.model.tiles.forEach((tile) => this.renderTile(tile));

		// render locations
		const discoveredLocations = this.save.locations.filter((l) => l.discovered.get());
		discoveredLocations.forEach((l) => this.renderLocation(l));

		// render hero
		const HERO_SIZE = 5;
		const tileHero = new Vector2(this.model.heroPosition.x * this.tileSize.x, this.model.heroPosition.y * this.tileSize.y)
			.add(this.tileSize.multiply(0.5));

		this.drawCircle(
			tileHero,
			HERO_SIZE,
			'yellow',
			{width: 1, color: 'red'}
		);

	}

}
