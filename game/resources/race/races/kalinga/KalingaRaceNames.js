import RaceNamesResources from "../../RaceNamesResource";

export default class KalingaRaceNames extends RaceNamesResources {

	constructor() {
		super();

		// FACTIONS

		this.factionNames.addSingles(
			[
				'The Dragons',
				'Black Dragons',
				'The Ring of Fire',
				'Red Wing'
			]
		);

		this.factionNames.addStarts(
			[
				'Dragon',
				'Fire',
				'Doom',
				'Heat',
				'Hell',
				'Xyro',
				'Pyro',
			]
		);

		this.factionNames.addEnds(
			[
				' Fleet',
				' Circle',
				' Brotherhood',
				' Swarm',
				' of the South',
			]
		);

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Draconia',
				'Ashenguard',
				'Burnt Palace',
				'Dragon\'s Dung'
			]
		);

		this.locationNames.addStarts(
			[
				'Dragon',
				'Fire',
				'Doom',
				'Heat',
				'Hell',
				'Xyro',
				'Pyro',
				'Malakh',
				'Malkuth',
				'Wyvern'
			]
		);

		this.locationNames.addEnds(
			[
				'forge',
				'peak',
				'nest',
				' Village',
				' Forest'
			]
		);


		// CHARACTERS

		// male

		this.maleNames.addSingles(
			[
				'Paarthurnax',
				'Kazul',
				'Tiamat',
				'Trag\'Oul'
			]
		);

		this.maleNames.addStarts(
			[
				'Ghaar',
				'Bolaar',
				'Kellon',
				'Eldo'
			]
		);

		this.maleNames.addEnds(
			[
				'torax',
				'torix',
				'devorax',
				'inetix',
				'xon'
			]
		);

		// female

		this.femaleNames.addSingles(
			[
				'Ysera',
				'Elvarg',
				'Grima'
			]
		);

		this.femaleNames.addStarts(
			[
				'Buler',
				'Milen',
				'Doleni',
				'Kera',
			]
		);

		this.femaleNames.addEnds(
			[
				'axa',
				'xia',
				'gara',
				'fyrma'
			]
		);

	}
}
