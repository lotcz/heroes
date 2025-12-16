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
				'Bobo',
				'Bur',
				'Dag',
				'Gor'
			]
		);

		this.maleNames.addEnds(
			[
				'gosh',
				'dodo',
				'\'aragh',
				'tar',
				'tok',
				'tak'
			]
		);

		// female

		this.femaleNames.addSingles(
			[
				'Marghorzatha',
			]
		);

		this.femaleNames.addStarts(
			[
				'Zit',
				'Zin',
				'Ubu',
				'Bum',
				'Gro',
				'Aguh'
			]
		);

		this.femaleNames.addEnds(
			[
				'a',
				'ba',
				'\'gha',
				'rola',
				'naka'
			]
		);

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Grypon'
			]
		);

		this.locationNames.addStarts(
			[
				'Orc',
				'Ogre',
				'Goblin',
				'Black',
				'Dark',
				'Swamp',
				'Grim',
				'Sleepy',
				'Margh',
				'Tar'
			]
		);

		this.locationNames.addEnds(
			[
				'moor',
				'marsh',
				'hole',
				' Bylina',
				' Gate',
				' Hollow',
				' Pit'
			]
		);


	}
}
