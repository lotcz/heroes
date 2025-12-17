import FactionStyleResource from "../FactionStyleResource";

export default class OrcsFaction extends FactionStyleResource {

	constructor(id) {
		super(id);

		this.name.set('Orcs');
		this.townImage.set('img/poi/orc-village.png');


		// CHARACTERS

		// male

		this.maleNames.addSingles(
			[
				'Zog',
				'Un',
				'Baghtru'
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
				'Grypon',
				'Orkanger',
				'Sulum',
				'Usuldom',
				'Halom',
				'Skullkeep'
			]
		);

		this.locationNames.addStarts(
			[
				'Orc',
				'Ogre',
				'Goblin',
				'Black',
				'Bad',
				'Dark',
				'Grim',
				'Sleepy',
				'Margh',
				'Gorog',
				'Tar',
				'Night'
			]
		);

		this.locationNames.addEnds(
			[
				'moor',
				'marsh',
				' Bylina',
				' Hollow',
				' Pit',
				' Darok',
				'\'arok',
				' Swamps',
				' Bog'
			]
		);


	}
}
