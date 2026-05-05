import RaceNamesResources from "../../RaceNamesResource";

export default class AdelanRaceNames extends RaceNamesResources {

	constructor() {
		super('Adelan');

		// FACTIONS

		this.factionNames.addSingles(
			[]
		);

		this.factionNames.addStarts(
			[
				'Blue',
				'Northern',
				'Western',
				'Purple',
				'Scarlett',
				'Hansel'
			]
		);

		this.factionNames.addEnds(
			[
				' Guild',
				' Hansa',
				' Camarilla',
				' Traders',
				' Merchants',
				' Kingdom',
				' Family'
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
				'springs',
				'wood',
				'dale',
				'vale',
				'ville',
				'gate',
				' Castle',
				' Field',
				' Road',
				' Mill',
				' Trail',
				' Gate',
				' Forest',
				' Woods',
				' Dale',
				' Torendol',
				' Valley',
				' Grove'
			]
		);

		// CHARACTERS

		//male

		this.maleNames.addSingles([]);

		this.maleNames.addStarts(
			[
				'Tanyl',
				'Orist',
				'Arthur',
				'Tom',
				'Jon',
				'Ian',
				'Marek',
				'Karel',
				'Sebastian',
				'Bernart',
				'Joachym',
				'Mattuy',
				'Lumyr',
				'Vinkenc',
				'Salomir',
				'Filip',
				'Smesek',
				'Barek',
				'Folda',
				'Grzegorz'
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
				' Horseman',
				' Stone',
				' '
			]
		);

		// female

		this.femaleNames.addSingles([]);

		this.femaleNames.addStarts(
			[
				'Milena',
				'Kyriella',
				'Valana',
				'Kamila',
				'Gabriella',
				'Lucia',
				'Alina',
				'Perla',
				'Margo',
				'Agaja',
				'Ivera',
				'Inna',
				'Inka',
				'Venka',
				'Klara',
				'Saninka',
				'Lidunka'
			]
		);

		this.femaleNames.ends = this.maleNames.ends;

	}
}
