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
				' Cottages',
				' Fields',
				' Village',
				' Cult',
				' Tree',
				' Stones',
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
				'Gregor',
				'Slavo',
				'Baldur',
				'Sidek',
				'Nebojsa'
			]
		);

		this.maleNames.addEnds(
			[
				' Kovar',
				' Dobry',
				' Silny',
				' Kamen',
				' Tesar',
				' Kapek',
				' Ptak',
				' Capek',
				' Kamis',
				' Havel',
				' Pekar',
				' Krasny'
			]
		);

		// female

		this.femaleNames.addSingles([]);

		this.femaleNames.addStarts(
			[
				'Milena',
				'Kyriela',
				'Kyra',
				'Valana',
				'Kamila',
				'Gabriela',
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
				'Prota',
				'Slavka'
			]
		);

		this.femaleNames.addEnds(
			[
				' Kovarova',
				' Dobra',
				' Silna',
				' Kamenova',
				' Tesarova',
				' Kapkova',
				' Ptakova',
				' Capkova',
				' Kamisova',
				' Havlova',
				' Pekarova',
				' Krasna'
			]
		);

	}
}
