import {BiotopeResource} from "../BiotopeResource";

export class ForestBiotope extends BiotopeResource {

	constructor(id = 0) {
		super(id);

		this.name.set('Forest');
		this.texture.set('img/texture/forest.jpg');
		this.illustration.set('img/biotope/forest.jpg');

		this.addDecoration('Pine Trees', 'img/decor/pine-trees.png');
		this.addDecoration('Dead Tree', 'img/decor/dead-tree-trunk.png', true);
	}

}
