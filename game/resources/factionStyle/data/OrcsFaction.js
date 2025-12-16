import FactionStyleResource from "../FactionStyleResource";

export default class OrcsFaction extends FactionStyleResource {

	constructor(id) {
		super(id);

		this.name.set('Orcs');

		// CHARACTERS

		// male

		this.maleNames.addSingles(
			[
				'Zog',
				'Un'
			]
		);

		this.maleNames.addStarts(
			[
				'Bur',
				'Dag',
				'Gor'
			]
		);

		this.maleNames.addEnds(
			[
				'tar',
				'tak',
				'gosch',
				'tok'
			]
		);

		// female

		this.femaleNames.addSingles(
			[

			]
		);

		this.femaleNames.addStarts(
			[
				'Zit',
				'Uru',
				'Bum'
			]
		);

		this.femaleNames.addEnds(
			[
				'gha',
				'rol',
				'ba',
				'naka'
			]
		);

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Mordor',
				'Grypon'
			]
		);

		this.locationNames.addStarts(
			[
				'Black',
				'Dark',
				'Swamp',
				'Grim',
				'Sleepy',
				'Margh'
			]
		);

		this.locationNames.addEnds(
			[
				'moor',
				'marsh',
				' Bylina',
				' Gate'
			]
		);


	}
}
