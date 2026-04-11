import RaceNamesResources from "../../RaceNamesResource";

export default class AdelanRaceNames extends RaceNamesResources {

	constructor() {
		super();

		// FACTIONS

		this.factionNames.addSingles(
			[
				''
			]
		);

		this.factionNames.addStarts(
			[
				'Blue',
				'Northern',
				'Western',
				'Purple',
				'Scarlett'
			]
		);

		this.factionNames.addEnds(
			[
				' Guild',
				' Hansa',
				' Camarilla',
				' Traders',
				' Merchants',
				' Kingdom'
			]
		);

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Baldur\'s Gate',
				'King\'s Landing'
			]
		);

		this.locationNames.addStarts(
			[
				'Man',
				'Rich',
				'Spring',
				'Kings',
				'Prince',
				'Queen',
				'Star',
				'Trade',
				'Merchant'
			]
		);

		this.locationNames.addEnds(
			[
				'field',
				'burg',
				'castle',
				'port',
				' Castle',
				' Field',
				' Road',
				' Mill',
				' Trail',
			]
		);

		// CHARACTERS

		//male

		this.maleNames.addSingles(
			[
				'Aramir',
				'Zubaran',
			]
		);

		this.maleNames.addStarts(
			[
				'Arthur',
				'Tom',
				'Jon',
				'Ian',
				'Marek',
				'Karel',
				'Sebastian',
			]
		);

		this.maleNames.addEnds(
			[
				' Goodbody',
				' Armstrong',
				' Smith',
				' Hunter',
				' Birdman',
				' Carpenter',
				' Horseman'
			]
		);

		// female

		this.femaleNames.addSingles(
			[
				'Kyriella',
				'Valana'
			]
		);

		this.femaleNames.addStarts(
			[
				'Kamila',
				'Gabriella',
				'Lucia',
				'Alina',
				'Perla',
				'Margo',
			]
		);

		this.femaleNames.addEnds(
			[
				' Goodbody',
				' Armstrong',
				' Smith',
				' Hunter',
				' Birdman',
				' Carpenter',
				' Horseman'
			]
		);

	}
}
