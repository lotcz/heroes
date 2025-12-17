import FactionStyleResource from "../FactionStyleResource";

export default class HumanFaction extends FactionStyleResource {

	constructor(id) {
		super(id);

		this.name.set('Men');
		this.townImage.set('img/poi/castle.png');

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

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Baldur\'s Gate',
				'King\'s Landing',
				''
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
				'Star'
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


	}
}
