import RaceNamesResources from "../../RaceNamesResource";

export default class AdelanRaceNames extends RaceNamesResources {

	constructor() {
		super();

		// FACTIONS

		this.factionNames.addSingles(
			[
				'Hansel Family'
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
				'Ishar',
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
				'Merchant',
				'Good',
				'Green',
				'Sun',
				'Sunny',
				'Moon',
				'Summer',
				'Flower'
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
				'springs',
				'wood',
				'dale',
				'vale',
				'ville',
				' Forest',
				' Woods',
				' Dale',
				' Torendol',
				' Gate',
				' Valley',
				' Grove'
			]
		);

		// CHARACTERS

		//male

		this.maleNames.addSingles(
			[
				'Tanyl',
				'Orist',
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
