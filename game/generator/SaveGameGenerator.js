import {PerlinNoise} from "./PerlinNoise";
import HeroesSaveGameModel from "../savegame/HeroesSaveGameModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import NumberHelper from "wgge/core/helper/NumberHelper";
import CornersGenerator from "./CornersGenerator";
import RiverGenerator from "./RiverGenerator";

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

	fillWith(heightFunc, precipitationFunc, temperatureFunc) {
		this.savegame.travel.tiles.reset();
		for (let x = 0; x < this.savegame.travel.tiles.boardSize.x; x++) {
			for (let y = 0; y < this.savegame.travel.tiles.boardSize.y; y++) {
				this.savegame.travel.tiles.addTile(x, y, heightFunc(x, y), precipitationFunc(x, y), temperatureFunc(x, y));
			}
		}
	}

	perlinTiles() {
		const perlinH = new PerlinNoise();
		const perlinP = new PerlinNoise();
		const perlinT = new PerlinNoise();
		this.fillWith(
			(x, y) => perlinH.fractalNoise(x / 50, y / 50, 8),
			(x, y) => perlinP.fractalNoise(x / 50, y / 50, 2),
			(x, y) => perlinT.fractalNoise(x / 50, y / 50, 2)
		);
	}

	addFaction(raceId = null) {
		const faction = this.savegame.factions.add();
		const race = raceId ? this.resources.races.getById(raceId) : this.resources.races.others.random();
		faction.raceId.set(race.id.get());
		faction.race.set(race);
		let factionName = race.names.factionNames.potential() > 0 ? race.names.factionNames.getName() : race.name.get();
		while (factionName === null || this.savegame.factions.nameExists(factionName)) {
			factionName = race.names.factionNames.getName();
		}
		console.log(raceId, factionName, race.names.factionNames.potential());
		faction.name.set(factionName);
		faction.color.set(`rgb(${NumberHelper.random(0, 255)}, ${NumberHelper.random(0, 255)}, ${NumberHelper.random(0, 255)})`);
		return faction;
	}

	addMonster(faction) {
		let tile = null;
		let unit = null;
		let i = 100;
		while (unit === null && i > 0) {
			i--;
			const race = this.resources.races.get(faction.raceId.get());
			tile = this.savegame.travel.tiles.random();
			unit = tile.isWater() ? race.unitTypes.randomWaterBased() : race.unitTypes.randomNormal();
		}
		if (unit) {
			const monster = this.savegame.travel.monsters.add();
			monster.position.set(tile.position);
			tile.monsterId.set(monster.id.get());
			monster.name.set(unit.name.get());
			monster.unitTypeId.set(unit.id.get());
			monster.factionId.set(faction.id.get());
			monster.stats.restoreState(unit.baseStats.getState());
			return monster;
		}
	}

	createSaveGame() {
		// create tiles
		const totalTiles = this.savegame.travel.tiles.boardSize.x * this.savegame.travel.tiles.boardSize.y;
		const minLandTiles = Math.round(totalTiles * 0.25);
		let landTiles = null;
		// generate perlin until we have enough land
		while (landTiles === null || landTiles.length < minLandTiles) {
			this.perlinTiles();
			landTiles = this.savegame.travel.tiles.filter((t) => t.isLand());
		}

		//create rivers and lakes
		const minRivers = Math.round(totalTiles * NumberHelper.random(0.002, 0.005));
		const rg = new RiverGenerator(this.savegame.travel.tiles, this.resources.biotopes.river, this.resources.biotopes.lake);
		rg.createRivers(minRivers);

		landTiles = landTiles.filter((t) => t.isLand());

		// assign biotope and decor
		this.savegame.travel.tiles.forEach(
			(t) => {
				if (t.biotopeId.isEmpty()) {
					const biotope = this.resources.biotopes.findBestFitting(
						t.heatLevel.get(),
						t.precipitationLevel.get(),
						t.heightLevel.get()
					);
					if (biotope) {
						t.biotopeId.set(biotope.id.get());
						t.biotope.set(biotope);
						if (biotope.decorations.count() > 0 && !t.isStream() && NumberHelper.randomPercent(50)) {
							const decor = biotope.decorations.random();
							t.decorId.set(decor.id.get());
							t.isBlocked.set(decor.isBlocking.get());
						}
					}
				}
			}
		);

		// assign tile corners/masks
		const cg = new CornersGenerator(this.resources.cornerMasks);
		for (let x = 0; x <= this.savegame.travel.tiles.boardSize.x; x++) {
			for (let y = 0; y <= this.savegame.travel.tiles.boardSize.y; y++) {
				cg.assignCorners(
					this.savegame.travel.tiles.getTile(x - 1, y - 1),
					this.savegame.travel.tiles.getTile(x, y - 1),
					this.savegame.travel.tiles.getTile(x - 1, y),
					this.savegame.travel.tiles.getTile(x, y)
				);
			}
		}

		// create factions
		this.resources.races.others.forEach((race) => this.addFaction(race.id.get()));
		const factionCount = NumberHelper.round(NumberHelper.random(3, 10));
		for (let i = this.savegame.factions.count(); i < factionCount; i++) {
			this.addFaction();
		}

		// create faction units
		this.savegame.factions.forEach(
			(faction) => {
				for (let i = 0; i < 16; i++) {
					this.addMonster(faction);
				}
			}
		);

		// create regions

		// create locations
		for (let i = 0; i < 100; i++) {
			let tile = null
			while (tile === null) {
				tile = ArrayHelper.random(landTiles);
				if (tile.locationId.isSet() || tile.decorId.isSet() || tile.isStream() || !tile.isFree()) {
					tile = null;
				}
			}

			const faction = this.savegame.factions.random();
			const race = faction.race.get();
			let locationName = null;
			if (race.names.locationNames.potential() > 0) {
				while (locationName === null || this.savegame.locations.nameExists(locationName)) {
					locationName = race.names.locationNames.getName();
				}
			}
			const location = this.savegame.locations.add();
			location.name.set(locationName);
			location.position.set(tile.position);
			location.factionId.set(faction.id.get());
			location.faction.set(faction);
			location.image.set(faction.race.get().townImage.get());

			tile.locationId.set(location.id.get());
			tile.location.set(location);
		}

		// create monsters
		const monstersRace = this.resources.races.monsters;
		const monstersFaction = this.addFaction(monstersRace.id.get());
		for (let i = 0; i < 100; i++) {
			this.addMonster(monstersFaction);
		}

		// place hero
		const heroTile = ArrayHelper.random(landTiles);
		this.savegame.travel.heroPosition.set(heroTile.position);

		return this.savegame;
	}
}
