import RaceNamesResources from "../../RaceNamesResource";

export default class TroglodyteRaceNames extends RaceNamesResources {

	constructor() {
		super('Troglodyte');

		// FACTIONS

		this.factionNames.addSingles([]);

		this.factionNames.addStarts(
			[
				'Black',
				'Blood',
				'Dark',
				'Motley',
				'Mud',
				'Swamp',
				'Cave',
				'Cavern',
				'Chasm',
				'Dirt',
				'Cannibal'
			]
		);

		this.factionNames.addEnds(
			[
				'heads',
				' Band',
				' Crew',
				' Brothers',
				' Tribe',
				' Fingers',
				' Slavers',
				' Cult',
				' Clan',
				' Family',
				' Worshippers'
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
				'Night',
				'Grim',
				'Sleepy',
				'Margh',
				'Gorog',
				'Tar',
				'Sunset'
			]
		);

		this.locationNames.addEnds(
			[
				'moor',
				'marsh',
				' Bylina',
				' Hollow',
				' Pit',
				' Den',
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
				'Gruk',
				'Zog',
				'Un',
				'Baghtru',
				'Hoven',
				'Grom',
				'Zar',
				'Kyj',
				'Han'
			]
		);

		this.maleNames.addStarts(
			[
				'Bobo',
				'Bur',
				'Dag',
				'Gor',
				'Ugro',
				'Hogo',
				'Reghro'
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
				'Struna',
				'Brana',
				'Ira'
			]
		);

		this.femaleNames.addStarts(
			[
				'Zit',
				'Zin',
				'Ubu',
				'Bum',
				'Gro',
				'Aguh',
				'Orog',
				'Imre'
			]
		);

		this.femaleNames.addEnds(
			[
				'a',
				'ba',
				'\'gha',
				'rola',
				'naka',
				'gaga'
			]
		);

	}
}
