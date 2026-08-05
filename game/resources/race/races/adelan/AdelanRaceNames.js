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
				'Hansel',
				'Spring',
				'Wheat',
				'Onion'
			]
		);

		this.factionNames.addEnds(
			[
				' Guild',
				' Hansa',
				' Camarilla',
				' Traders',
				' Tribe',
				' Valley',
				' Family',
				' Clan'
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
				'Flower',
				'Cherno'
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
				'brod',
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
				'Tomas',
				'Jan',
				'Ian',
				'Marek',
				'Karel',
				'Pavel',
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
				'Grzegorz',
				'Slavo',
				'Baldur',
				'Sidek',
				'Nebojsa'
			]
		);

		this.maleNames.addEnds(
			[
				' Goodbody',
				' Armstrong',
				' Smith',
				' the Blacksmith',
				' the Hunter',
				' Birdman',
				' the Carpenter',
				' Stone',
				' Kapek',
				' Ptak',
				' Capek',
				' Kamis',
				' Havel',
				' the Baker',
				' the Beautiful'
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
				'Nina',
				'Ninka',
				'Venna',
				'Venka',
				'Klara',
				'Saninka',
				'Lidunka',
				'Prota'
			]
		);

		this.femaleNames.ends = this.maleNames.ends;

	}
}
