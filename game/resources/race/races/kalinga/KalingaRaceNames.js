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
				' Tribe',
				' Village',
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

		this.maleNames.addSingles([]);

		this.maleNames.addStarts(
			[
				'Uliwar',
				'Anto',
				'Kanza',
				'Kazul',
				'Tiamat',
				'Trago',
				'Igalo',
				'Ghaar',
				'Bolaar',
				'Kellon',
				'Eldo',
				'Kanza'
			]
		);

		this.maleNames.addEnds(
			[
				' Tsoede',
				' Etsu',
				' Obari',
				' Obungu',
				' Bulinga',
				' Malinto',
				' Anwe'
			]
		);

		// female

		this.femaleNames.addSingles(
			[]
		);

		this.femaleNames.addStarts(
			[
				'Ysera',
				'Elvarg',
				'Grima',
				'Igala',
				'Bulera',
				'Doleni',
				'Kera',
				'Kiri'
			]
		);

		this.femaleNames.ends = this.maleNames.ends;

	}
}
