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
				'Spearmen'
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
				'High'
			]
		);

		this.locationNames.addEnds(
			[
				' Camp',
				' Village',
				' Peak'
			]
		);

		// CHARACTERS

		//male

		this.maleNames.addSingles(
			[
				'Snori',
				'Panu'
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
			]
		);

		this.femaleNames.addStarts(
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
