import RaceNamesResources from "../../RaceNamesResource";

export default class KalingaRaceNames extends RaceNamesResources {

	constructor() {
		super('Kalinga');

		// FACTIONS

		this.factionNames.addSingles(
			[
				'Lions',
				'Black Dragons',
				'The Ring of Fire',
				'Red Wing'
			]
		);

		this.factionNames.addStarts(
			[
				'Dragon',
				'Fire',
				'Jungle',
				'Heat',
				'Xyro',
				'Pyro',
				'Green',
				'Turquoise',
				'Black',
				'Head Hunting'
			]
		);

		this.factionNames.addEnds(
			[
				' Tribe',
				' Lions',
				' Tigers',
				' Brotherhood',
				' Swarm',
				' Frogs',
				' Turtles',
				' Family',
				' Clan'
			]
		);

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Simbala',
				'Gibrina',
				'Balimin'
			]
		);

		this.locationNames.addStarts(
			[
				'Dragon',
				'Doom',
				'Heat',
				'Xyro',
				'Pyro',
				'Malakh',
				'Malkuth',
				'Wyvern',
				'Green',
				'Jungle',
				'Canopy',
				'Toad',
				'Snake',
				'Summer',
				'Sun'
			]
		);

		this.locationNames.addEnds(
			[
				' Nest',
				' Village',
				' Forest',
				' Swamp',
				' Huts',
				' Settlement',
				' Camp'
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
				'Kanza',
				'Gibri',
				'Balim'
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
				' Anwe',
				' Bulungwe',
				' Herango'
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
				'Kiri',
				'Kibi',
				'Okabi',
				'Malena',
				'Simba'
			]
		);

		this.femaleNames.ends = this.maleNames.ends;

	}
}
