import {BiotopeResource} from "./BiotopeResource";
import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";

export default class BiotopesResource extends ModelNodeTable {

	constructor() {
		super((id) => new BiotopeResource(id));

		this.addBiotope(0, 'Water', 'img/texture/water.jpg');
		this.addBiotope(1, 'Desert', 'img/texture/desert.jpg');
		this.addBiotope(2, 'Grassland', 'img/texture/grass.jpg');
		this.addBiotope(3, 'Tundra', 'img/texture/paper.jpg');
		this.addBiotope(4, 'Snow', 'img/texture/snow.jpg');
	}

	addBiotope(level, name, texture) {
		const biotope = this.add();
		biotope.name.set(name);
		biotope.texture.set(texture);
		biotope.level.set(level);
	}

	getByName(name) {
		return this.find((b) => b.name.equalsTo(name));
	}

	findAllByLevel(level) {
		return this.filter((b) => b.level.equalsTo(level));
	}

	findFirstByLevel(level) {
		return this.find((b) => b.level.equalsTo(level));
	}
}
