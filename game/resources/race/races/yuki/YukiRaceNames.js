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

			]
		);

		this.factionNames.addEnds(
			[
				' of the North',
				' of Snowy Peaks',
				' of White River',
				' of Frozen Lake',
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
				' Peak',
				' Lake',
				' Mountain',
				' Tents',
				' Hills',
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
				'Filik'
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
				'Kirri'
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
