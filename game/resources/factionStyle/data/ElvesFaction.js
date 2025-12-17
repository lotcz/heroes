import FactionStyleResource from "../FactionStyleResource";

export default class ElvesFaction extends FactionStyleResource {

	constructor(id) {
		super(id);

		this.name.set('Elves');
		this.townImage.set('img/poi/town.png');

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

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Elviron'
			]
		);

		this.locationNames.addStarts(
			[
				'Elven',
				'Good',
				'Green',
				'Yul',
				'Sun',
				'Moon',
				'Summer'
			]
		);

		this.locationNames.addEnds(
			[
				'springs',
				'wood',
				'dale',
				'vale',
				'ville',
				' Woods',
				' Dale',
				' Torendol',
				' Gate',
				' Valley'
			]
		);


	}
}
