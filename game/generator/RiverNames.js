import NamesResource from "../basic/NamesResource";

export default class RiverNames extends NamesResource {

	constructor() {
		super();

		this.addSingles(
			[
				'Ploutchniz',
				'Otava',
				'Libera',
				'Kalinpora',
				'Jitava',
				'Akota',
				'Vilerva'
			]
		);

		this.addStarts(
			[
				'Green',
				'White',
				'Blue',
				'Wild',
				'Fast',
				'Fish',
				'Trout',
				'Eel',
				'Beaver',
				'Bird',
				'Raccoon',
				'Kalingan',
				'Adelan',
				'Caerelusan',
				'Kobok',
				'Stone',
				'Dragon',
				'Troglodyte',
				'Dragonfly'
			]
		);

		this.addEnds(
			[
				' River',
				' Rapids',
				' Streams',
				' Creek',
				' Brook'
			]
		);

	}
}
