import {PerlinNoise} from "./PerlinNoise";
import HeroesSaveGameModel from "../savegame/HeroesSaveGameModel";
import ArrayHelper from "wgge/core/helper/ArrayHelper";
import NumberHelper from "wgge/core/helper/NumberHelper";
import CornersGenerator from "./CornersGenerator";
import RiverGenerator from "./RiverGenerator";
import UnitModel from "../savegame/units/UnitModel";
import FactionModel from "../savegame/faction/FactionModel";
import ItemModel from "../savegame/inventory/items/ItemModel";

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
		const faction = new FactionModel();
		const race = raceId ? this.resources.races.getById(raceId) : this.resources.races.others.random();
		faction.raceId.set(race.id.get());
		faction.race.set(race);
		const existingNames = this.savegame.factions.getNames();
		const factionName = race.names.factionNames.potential() > 0 ? race.names.factionNames.chooseRandomName(existingNames) : race.name.get();
		faction.name.set(factionName);
		faction.color.set(`rgb(${NumberHelper.random(0, 255)}, ${NumberHelper.random(0, 255)}, ${NumberHelper.random(0, 255)})`);
		return this.savegame.factions.add(faction);
	}

	addMonster(faction) {
		const race = this.resources.races.get(faction.raceId.get());
		const tile = this.savegame.travel.tiles.randomFree();
		if (!tile) return;
		const unitType = race.unitTypes.randomForTile(tile);
		if (!unitType) return;

		const monster = new UnitModel();
		const names = monster.isMale() ? race.names.maleNames : race.names.femaleNames;
		const existingNames = this.savegame.monsters.getNames();
		const name = names.potential() > 0 ? names.chooseRandomName(existingNames) : unitType.name.get();

		monster.name.set(name);
		monster.unitTypeId.set(unitType.id.get());
		monster.factionId.set(faction.id.get());
		monster.stats.restoreState(unitType.baseStats.getState());

		const monsterGroup = this.savegame.monsters.add();
		monsterGroup.members.add(monster);
		monsterGroup.position.set(tile.position);
		tile.group.set(monsterGroup);

		return monsterGroup;
	}

	addLocation() {
		const tile = this.savegame.travel.tiles.randomFree(false, false, false);
		const faction = this.savegame.factions.randomForTile(tile);
		if (!faction) return;
		const race = faction.race.get();
		const existingNames = this.savegame.locations.getNames();
		const locationName = race.names.locationNames.chooseRandomName(existingNames);
		const location = this.savegame.locations.add();
		location.name.set(locationName);
		location.position.set(tile.position);
		location.factionId.set(faction.id.get());
		location.faction.set(faction);
		location.image.set(faction.race.get().townImage.get());

		tile.locationId.set(location.id.get());
		tile.location.set(location);
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
		const rg = new RiverGenerator(this.savegame, this.resources.biotopes.river, this.resources.biotopes.lake);
		rg.createRivers(minRivers);
		//landTiles = landTiles.filter((t) => t.isLand());

		this.savegame.travel.tiles.forEach(
			(t) => {
				// delete unnecessary streams - only keep rivers going to stream tiles
				if (t.isLake() || t.isOcean()) {
					const streamConnections = t.rivers.filter(
						(r) => {
							const tile = this.savegame.travel.tiles.getTile(r.targetPosition);
							if (!tile) return false;
							return tile.isStream();
						}
					);
					t.rivers.reset();
					t.rivers.add(streamConnections);
				}

				// delete doubled streams
				if (t.isRiver() || t.isStream()) {
					const doubledConnections = t.rivers.filter(
						(r) => t.rivers.exists(
							(d) => d.targetPosition.equalsTo(r.targetPosition)
								&& ((d.strength.get() < r.strength.get()) || (d.strength.equalsTo(r.strength.get() && (d.riverId.get() < r.riverId.get()))))
						)
					);
					doubledConnections.forEach((dc) => {
						const strength = dc.strength.get();
						const remaining = t.rivers.find((r) => r !== dc && dc.targetPosition.equalsTo(r.targetPosition));
						t.rivers.remove(dc);
						if (remaining) remaining.strength.increase(strength);
					});
				}

				// assign biotope
				if (t.biotopeId.isEmpty()) {
					const biotope = this.resources.biotopes.findBestFitting(
						t.heatLevel.get(),
						t.precipitationLevel.get(),
						t.heightLevel.get()
					);
					t.biotopeId.set(biotope.id.get());
					t.biotope.set(biotope);
				}
				if (t.biotope.isEmpty()) {
					t.biotope.set(this.resources.biotopes.get(t.biotopeId.get()));
				}

				// assign decor
				const biotope = t.biotope.get();
				if (NumberHelper.randomPercent(50)) {
					if (biotope.decorations.count() > 0 && !t.hasRiverStream()) {
						const decor = biotope.decorations.random();
						t.decorId.set(decor.id.get());
						t.isBlocked.set(decor.isBlocking.get());
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
		this.resources.races.others.forEach(
			(race) => {
				//race.echoNamesPotentials();
				this.addFaction(race.id.get());
			}
		);
		const factionCount = NumberHelper.round(NumberHelper.random(3, 10));
		for (let i = this.savegame.factions.count(); i < factionCount; i++) {
			this.addFaction();
		}

		// create faction units
		this.savegame.factions.forEach(
			(faction) => {
				for (let i = 0; i < 32; i++) {
					this.addMonster(faction);
				}
			}
		);

		// create regions

		// create locations
		const locationCount = Math.round(totalTiles / 30);
		for (let i = 0; i < locationCount; i++) {
			this.addLocation();
		}

		// party
		const protagonistFaction = this.savegame.factions.random();
		const protagonistRace = protagonistFaction.race.get();
		const protagonistUnitType = protagonistRace.unitTypes.random();
		const protagonist = new UnitModel();
		protagonist.sex.set(NumberHelper.random(0, 1) < 0.5);
		protagonist.name.set(protagonist.isMale() ? protagonistRace.names.maleNames.getName() : protagonistRace.names.femaleNames.getName());
		protagonist.portrait.set(ArrayHelper.random(protagonist.isMale() ? protagonistRace.malePortraits : protagonistRace.femalePortraits));
		protagonist.factionId.set(protagonistFaction.id.get());
		protagonist.faction.set(protagonistFaction);
		protagonist.unitTypeId.set(protagonistUnitType.id.get());
		protagonist.unitType.set(protagonistUnitType);
		protagonist.stats.restoreState(protagonistUnitType.baseStats.getState());

		protagonist.inventory.meleeWeapon.item.set(new ItemModel(this.resources.itemDefinitions.stoneAxe.id.get()));
		protagonist.inventory.legs.item.set(new ItemModel(this.resources.itemDefinitions.skirt.id.get()));
		protagonist.inventory.shoes.item.set(new ItemModel(this.resources.itemDefinitions.shoes.id.get()));

		protagonist.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.psilocybe.id.get()));
		protagonist.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.greenPsilocybe.id.get()));
		protagonist.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.handAxe.id.get()));
		protagonist.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.bones.id.get()));
		protagonist.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.meat.id.get()));
		protagonist.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.dart.id.get()));

		this.savegame.party.members.add(protagonist);

		const sidekickFaction = this.savegame.factions.random();
		const sidekickRace = sidekickFaction.race.get();
		const sidekickUnitType = sidekickRace.unitTypes.random();
		const sidekick = this.savegame.party.members.add();
		sidekick.sex.set(NumberHelper.random(0, 1) < 0.5);
		sidekick.name.set(sidekick.isMale() ? sidekickRace.names.maleNames.getName() : sidekickRace.names.femaleNames.getName());
		sidekick.portrait.set(ArrayHelper.random(sidekick.isMale() ? sidekickRace.malePortraits : sidekickRace.femalePortraits));
		sidekick.factionId.set(sidekickFaction.id.get());
		sidekick.faction.set(sidekickFaction);
		sidekick.unitTypeId.set(sidekickUnitType.id.get());
		sidekick.unitType.set(sidekickUnitType);
		sidekick.stats.restoreState(sidekickUnitType.baseStats.getState());

		sidekick.inventory.meleeWeapon.item.set(new ItemModel(this.resources.itemDefinitions.spear.id.get()));
		sidekick.inventory.rangedWeapon.item.set(new ItemModel(this.resources.itemDefinitions.blowpipe.id.get()));
		sidekick.inventory.talisman1.item.set(new ItemModel(this.resources.itemDefinitions.talismanOfHealth.id.get()));
		sidekick.inventory.legs.item.set(new ItemModel(this.resources.itemDefinitions.skirt.id.get()));
		sidekick.inventory.shoes.item.set(new ItemModel(this.resources.itemDefinitions.shoes.id.get()));

		sidekick.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.psilocybe.id.get()));
		sidekick.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.greenPsilocybe.id.get()));
		sidekick.inventory.items.addItem(new ItemModel(this.resources.itemDefinitions.venus.id.get()));

		const partyTile = this.savegame.travel.tiles.randomFree(false, true, true);
		this.savegame.party.position.set(partyTile.position);
		this.savegame.party.stats.movement.baseValue.set(3);

		// create monsters
		const monstersRace = this.resources.races.monsters;
		const monstersFaction = this.addFaction(monstersRace.id.get());
		const monsterCount = Math.round(totalTiles / 20);
		for (let i = 0; i < monsterCount; i++) {
			this.addMonster(monstersFaction);
		}

		return this.savegame;
	}
}
