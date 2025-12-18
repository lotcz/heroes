import RaceResource from "../RaceResource";

export default class DragonsRace extends RaceResource {

	constructor(id) {
		super(id);

		this.name.set('Dragons');
		this.townImage.set('img/poi/town.png');

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
			]
		);

		this.locationNames.addEnds(
			[
				'forge',
				'peak',
				' Tower',
				' Nest',
				' Den',
				' Mountain'
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
