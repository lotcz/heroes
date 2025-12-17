import {PerlinNoise} from "./PerlinNoise";
import HeroesSaveGameModel from "../savegame/HeroesSaveGameModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class SaveGameGenerator {

	/**
	 * @type HeroesSaveGameModel
	 */
	savegame;

	/**
	 * @type HeroesResources
	 */
	resources;

	constructor(resources, width = 100, height = 100) {
		this.resources = resources;
		this.savegame = new HeroesSaveGameModel();
		this.savegame.boardSize.set(width, height);
	}

	fillWith(heightFunc, precipitationFunc) {
		this.savegame.tiles.reset();
		for (let x = 0; x < this.savegame.boardSize.x; x++) {
			for (let y = 0; y < this.savegame.boardSize.y; y++) {
				this.savegame.addTile(x, y, heightFunc(x, y), precipitationFunc(x, y));
			}
		}
	}

	perlinTiles() {
		const perlinH = new PerlinNoise();
		const perlinP = new PerlinNoise();
		this.fillWith(
			(x, y) => perlinH.fractalNoise(x / 50, y / 50, 8),
			(x, y) => perlinP.fractalNoise(x / 50, y / 50, 2)
		);
	}

	createSaveGame() {
		this.perlinTiles();

		this.savegame.tiles.forEach(
			(t) => {
				if (t.biotopeId.isEmpty()) {
					const biotope = this.resources.biotopes.findBestFitting(t.heightLevel.get(), t.precipitationLevel.get());
					if (biotope) t.biotopeId.set(biotope.id.get());
				}
			}
		);

		const landTiles = this.savegame.tiles.filter((t) => t.heightLevel.get() > 0);
		if (landTiles.length > 0) {
			for (let i = 0; i < 100; i++) {
				const tile = ArrayHelper.random(landTiles);
				const factionStyle = this.resources.factionStyles.random();
				const maleName = factionStyle.maleNames.getName();
				const femaleName = factionStyle.femaleNames.getName();
				let locationName = null;
				while (locationName === null || this.savegame.locations.nameExists(locationName)) {
					locationName = factionStyle.locationNames.getName();
				}
				console.log(locationName);
				const location = this.savegame.locations.add();
				location.name.set(locationName);
				location.position.set(tile.position);
				location.image.set(factionStyle.townImage.get());
			}
		}

		const heroTile = ArrayHelper.random(landTiles);
		this.savegame.hero.set(heroTile.position);

		return this.savegame;
	}
}
