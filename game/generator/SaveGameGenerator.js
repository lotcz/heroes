import {PerlinNoise} from "./PerlinNoise";
import HeroesSaveGameModel from "../savegame/HeroesSaveGameModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import NumberHelper from "wgge/core/helper/NumberHelper";

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
		this.savegame.travel.tiles.boardSize.set(width, height);
	}

	fillWith(heightFunc, precipitationFunc) {
		this.savegame.travel.tiles.reset();
		for (let x = 0; x < this.savegame.travel.tiles.boardSize.x; x++) {
			for (let y = 0; y < this.savegame.travel.tiles.boardSize.y; y++) {
				this.savegame.travel.tiles.addTile(x, y, heightFunc(x, y), precipitationFunc(x, y));
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

	addFaction(raceId = null) {
		const faction = this.savegame.factions.add();
		const race = raceId ? this.resources.races.getById(raceId) : this.resources.races.random();
		faction.raceId.set(race.id.get());
		faction.race.set(race);
		let factionName = null;
		while (factionName === null || this.savegame.factions.nameExists(factionName)) {
			factionName = race.factionNames.getName();
		}
		faction.name.set(factionName);
		faction.color.set(`rgb(${NumberHelper.random(0, 255)}, ${NumberHelper.random(0, 255)}, ${NumberHelper.random(0, 255)})`);
		return faction;
	}

	createSaveGame() {
		// create tiles
		const totalTiles = this.savegame.travel.tiles.boardSize.x * this.savegame.travel.tiles.boardSize.y;
		const minLandTiles = Math.round(totalTiles * 0.25);
		let landTiles = null;
		while (landTiles === null || landTiles.length < minLandTiles) {
			this.perlinTiles();
			landTiles = this.savegame.travel.tiles.filter((t) => t.isLand());
		}

		console.log(`Land tiles: ${landTiles.length} of ${totalTiles}`);

		// assign biotope and decor
		this.savegame.travel.tiles.forEach(
			(t) => {
				if (t.biotopeId.isEmpty()) {
					const biotope = this.resources.biotopes.findBestFitting(t.heightLevel.get(), t.precipitationLevel.get());
					if (biotope) {
						t.biotopeId.set(biotope.id.get());
						t.biotope.set(biotope);
						if (biotope.decorations.count() > 0 && Math.random() < 0.5) {
							const decor = biotope.decorations.random();
							t.decorId.set(decor.id.get());
						}
					}
				}
			}
		);

		// create factions
		this.resources.races.forEach((race) => this.addFaction(race.id.get()));
		const factionCount = NumberHelper.round(NumberHelper.random(3, 10));
		for (let i = this.savegame.factions.count(); i < factionCount; i++) {
			this.addFaction();
		}

		this.savegame.factions.forEach(
			(faction) => {
				console.log(`${faction.race.get().name.get()}: ${faction.name.get()}`);
			});

		// create regions

		// create locations
		for (let i = 0; i < 100; i++) {
			const tile = ArrayHelper.random(landTiles);
			const faction = this.savegame.factions.random();
			let locationName = null;
			while (locationName === null || this.savegame.locations.nameExists(locationName)) {
				locationName = faction.race.get().locationNames.getName();
			}
			const location = this.savegame.locations.add();
			location.name.set(locationName);
			location.position.set(tile.position);
			location.factionId.set(faction.id.get());
			location.faction.set(faction);
			location.image.set(faction.race.get().townImage.get());
		}

		// place hero
		const heroTile = ArrayHelper.random(landTiles);
		this.savegame.travel.heroPosition.set(heroTile.position);

		return this.savegame;
	}
}
