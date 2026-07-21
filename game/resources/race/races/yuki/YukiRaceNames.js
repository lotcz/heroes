import RaceNamesResources from "../../RaceNamesResource";

export default class YukiRaceNames extends RaceNamesResources {

	constructor() {
		super('Yuki');

		// FACTIONS

		this.factionNames.addSingles(
			[
				'Seal Hunters',
				'White Spears'
			]
		);

		this.factionNames.addStarts(
			[
				'Hunters',
				'Stalkers',
				'Fishermen',
				'Seals',
				'Trackers',
				'Kayakers',
				'Trappers',
				'Clansmen'
			]
		);

		this.factionNames.addEnds(
			[
				' of the North',
				' of Snowy Peaks',
				' of White River',
				' of Frozen Lake',
				' of Bird Mountain'
			]
		);

		// LOCATIONS

		this.locationNames.addSingles(
			[
				'Yurku',
				'Yuuk',
				'Tampe',
				'Igloo',
				'Tarvik',
				'Mengo'
			]
		);

		this.locationNames.addStarts(
			[
				'Snow',
				'Yuki',
				'White',
				'Winter',
				'Ice',
				'Seal',
				'High',
				'Igloo',
				'Cold',
				'Breeze',
				'Hunting',
				'Fur',
				'Old',
				'New',
				'High'
			]
		);

		this.locationNames.addEnds(
			[
				' Camp',
				' Village',
				'peak',
				' Peak',
				'lake',
				' Lake',
				' Mountain',
				' Tents',
				'hills',
				' Hills',
				'creek',
				' Creek'
			]
		);

		// CHARACTERS

		//male

		this.maleNames.addSingles(
			[
				'Snori',
				'Panu',
				'Nupe',
				'Cippi',
				'Japi',
				'Ono',
				'Verlik',
				'Juri',
				'Olsoj',
				'Ari',
				'Topo',
				'Filik',
				'Killi',

			]
		);

		this.maleNames.addStarts(
			[
				'Be',
				'Ve',
				'Yne',
				'Meri',
				'Nami',
				'Yru',
				'Jeme',
				'Ilu',
				'Ono'
			]
		);

		this.maleNames.addEnds(
			[
				'l',
				'li',
				'lu',
				'lik',
				'lak',
				'lek',
				'r',
				'ri',
				'rik'
			]
		);

		// female

		this.femaleNames.addSingles(
			[
				'Pinja',
				'Moli',
				'Harpuna',
				'Kirri',
				'Kaya'
			]
		);

		this.femaleNames.starts = this.maleNames.starts;

		this.femaleNames.addEnds(
			[
				's',
				'ta',
				'ra',
				'ma',
				'na',
				'ja',
				'pi',
				'pa',
				'len',
				'ira',
				'lina',
				'irina'
			]
		);

	}
}
