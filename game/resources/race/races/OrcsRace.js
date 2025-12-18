import RaceResource from "../RaceResource";

export default class OrcsRace extends RaceResource {

	constructor(id) {
		super(id);

		this.name.set('Orcs');
		this.townImage.set('img/poi/orc-village.png');

		// FACTIONS

		this.factionNames.addSingles(
			[
				'Hovendors',
				'Masters of Dirt'
			]
		);

		this.factionNames.addStarts(
			[
				'Black',
				'Motley',
				'Muddy',
				'Swamp'
			]
		);

		this.factionNames.addEnds(
			[
				' Band',
				' Crew',
				' Brothers',
				' Tribe',
				' Fingers',
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
				'Skullkeep',
				'Hovendor'
			]
		);

		this.locationNames.addStarts(
			[
				'Orc',
				'Ogre',
				'Goblin',
				'Black',
				'Bad',
				'Muddy',
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

		// CHARACTERS

		// male

		this.maleNames.addSingles(
			[
				'Zog',
				'Un',
				'Baghtru',
				'Hoven'
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

	}
}
