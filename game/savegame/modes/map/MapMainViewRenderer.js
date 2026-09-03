import Vector2 from "wgge/core/model/vector/Vector2";
import Dictionary from "wgge/core/Dictionary";
import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";

const LOCATION_SIZE = 3;
const MONSTER_SIZE = 2;
const HERO_SIZE = 5;
const TILE_SIZE = 2;

export default class MapMainViewRenderer extends CanvasRenderer {

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
		this.tileSize = new Vector2(TILE_SIZE, TILE_SIZE);

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
		console.log('rendering location', location.name.get());
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
		super.renderInternal();

		// clear
		this.context2d.clearRect(0, 0, this.model.mainView.canvasSize.x, this.model.mainView.canvasSize.y);

		// render tiles
		const start = this.model.map.mapView.getRenderingStart();
		const end = this.model.map.mapView.getRenderingEnd();
		console.log(start.toString(), end.toString());

		for (let x = start.x; x < end.x; x += TILE_SIZE) {
			for (let y = start.y; y < end.y; y += TILE_SIZE) {
				const screenPosition = new Vector2(x, y);
				const mapPosition = this.model.map.mapView.getContentPosition(screenPosition);
				const heightLevel = this.model.map.getHeightLevel(mapPosition);
				const precipitationLevel = this.model.map.getPrecipitationLevel(mapPosition);
				const heatLevel = this.model.map.getHeatLevel(mapPosition);
				const biotope = this.game.resources.biotopes.findBestFitting(
					heatLevel,
					precipitationLevel,
					heightLevel,
				);
				const texture = this.biotopesTextures.get(biotope.id.get());
				this.drawRect(screenPosition, this.tileSize, texture);
			}
		}

		//this.model.travel.tiles.forEach((tile) => this.renderTile(tile));

		// render locations
		const discoveredLocations = this.model.locations.filter((l) => l.discovered.get());
		discoveredLocations.forEach((l) => this.renderLocation(l));

		// render visible monsters
		//const visibleMonsters = this.model.monsters.filter((m) => this.model.isPositionInView(m.position));
		//visibleMonsters.forEach((m) => this.renderMonster(m));

		// render hero

		const heroPosition = this.model.map.mapView.getWrapperPosition(this.model.party.position);

		this.drawCircle(
			heroPosition,
			HERO_SIZE,
			'yellow',
			{width: 1, color: 'red'}
		);

	}

}
