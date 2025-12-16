import FactionStyleResource from "../FactionStyleResource";

export default class ElvesFaction extends FactionStyleResource {

	constructor(id) {
		super(id);

		this.name.set('Elves');

		// CHARACTERS

		//male

		this.maleNames.addSingles(
			[
				'Centurion'
			]
		);

		this.maleNames.addStarts(
			[
				'Lego',
				'Aster',
				'Ma'
			]
		);

		this.maleNames.addEnds(
			[
				'las',
				'lion',
				'rion',
				'tian'
			]
		);

		// female

		this.femaleNames.addSingles(
			[
				'Stella'
			]
		);

		this.femaleNames.addStarts(
			[
				'Ves',
				'Vel',
				'Yne'
			]
		);

		this.femaleNames.addEnds(
			[
				'ena',
				'atha',
				'ansel',
				'rael'
			]
		);

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Moria'
			]
		);

		this.locationNames.addStarts(
			[
				'Good',
				'Green',
				'Yul',
				'Light',
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
