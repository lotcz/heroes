import RaceResource from "../RaceResource";

export default class ElvesRace extends RaceResource {

	constructor(id) {
		super(id);

		this.name.set('Elves');
		this.townImage.set('img/poi/elf-castle.png');

		// FACTIONS

		this.factionNames.addSingles(
			[
				'Green Sleeves',
				'Elven Ring'
			]
		);

		this.factionNames.addStarts(
			[
				'Elves',
				'Druids',
				'Healers',
				'Fellowship'
			]
		);

		this.factionNames.addEnds(
			[
				' of the South',
				' of Greendale',
				' of Flower Grove',
				' Brotherhood',
			]
		);

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Elviron',
				'Verbatimum',
				'Ishar'
			]
		);

		this.locationNames.addStarts(
			[
				'Elven',
				'Good',
				'Green',
				'Yul',
				'Sun',
				'Sunny',
				'Moon',
				'Summer',
				'Flower'
			]
		);

		this.locationNames.addEnds(
			[
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
				'Orist'
			]
		);

		this.maleNames.addStarts(
			[
				'Aste',
				'Cen',
				'Lego',
				'Me',
				'Ma',
				'Mar',
				'E',
				'Areva'
			]
		);

		this.maleNames.addEnds(
			[
				'las',
				'lin',
				'lion',
				'lien',
				'rion',
				'rian',
				'tion',
				'tian'
			]
		);

		// female

		this.femaleNames.addSingles(
			[
				'Stella',
				'Vashti',
				'Urmicca',
			]
		);

		this.femaleNames.addStarts(
			[
				'Shel',
				'Ves',
				'Vel',
				'Yne',
				'Meri',
				'Nami',
			]
		);

		this.femaleNames.addEnds(
			[
				'eia',
				'ena',
				'eira',
				'atha',
				'ansel',
				'rael',
				'bira',
				'aleth'
			]
		);

	}
}
