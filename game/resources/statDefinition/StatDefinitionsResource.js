import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import StatDefinitionResource from "./StatDefinitionResource";

// stats
export const STAT_HEALTH = 1;
export const STAT_MAGIC = 2;
export const STAT_MOVEMENT = 3;

// traits
export const STAT_FLYING = 10;
export const STAT_WATER_BASED = 11;

// other
export const STAT_LEVEL_PROGRESS = 1001;
export const STAT_EXPERIENCE = 1002;
export const STAT_ABILITY_POINTS = 1003;
export const STAT_SKILL_POINTS = 1004;

export const SYMPATHY_TOWARDS_PARTY = 3001;

export default class StatDefinitionsResource extends ModelNodeTable {

	constructor() {
		super((id) => new StatDefinitionResource(id));

		this.addStat(
			STAT_HEALTH,
			'Health',
			'Your life energy'
		);

		this.addTrait(
			STAT_FLYING,
			'Flying',
			'Flying creatures are not obstructed by mountains or water'
		);

	}

	addStatDefinition(id, name, desc, base, min = 0, max = null, isTrait = false) {
		const sd = this.add();
		sd.id.set(id);
		sd.name.set(name);
		sd.description.set(desc);
		sd.base.set(base);
		sd.min.set(min);
		sd.max.set(max);
		sd.isTrait.set(isTrait);
		return sd;
	}

	addStat(id, name, desc) {
		return this.addStatDefinition(id, name, desc, 10);
	}

	addTrait(id, name, desc) {
		return this.addStatDefinition(id, name, desc, 0, 0, 1, true);
	}

}
