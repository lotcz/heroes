import RaceNamesResources from "../../RaceNamesResource";

export default class YukiRaceNames extends RaceNamesResources {

	constructor() {
		super();

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
				'Igloo'
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
				'Igloo'
			]
		);

		this.locationNames.addEnds(
			[
				' Camp',
				' Village',
				' Peak',
				' Lake',
				' Mountain'
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
				'Jeme'
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
			]
		);

		this.femaleNames.starts = this.maleNames.starts;

		this.femaleNames.addEnds(
			[
				's',
				'len',
				'ira',
				'ta',
				'ra',
				'ma',
				'ja'
			]
		);

	}
}
