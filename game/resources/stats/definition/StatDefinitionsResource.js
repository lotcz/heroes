import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import StatDefinitionResource from "./StatDefinitionResource";

// stats
export const STAT_HEALTH = 1;
export const STAT_MOVEMENT = 2;
export const STAT_MELEE = 3;
export const STAT_RANGED = 4;
export const STAT_ARMOR = 5;

// traits
export const STAT_FLYING = 10;
export const STAT_SWIMMING = 11;
export const STAT_WALKING = 12;

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

	addStatDefinition(id, name, desc, max = null, isTrait = false) {
		const sd = this.add();
		sd.id.set(id);
		sd.name.set(name);
		sd.description.set(desc);
		sd.max.set(max);
		sd.isTrait.set(isTrait);
		return sd;
	}

	addStat(id, name, desc) {
		return this.addStatDefinition(id, name, desc);
	}

	addTrait(id, name, desc) {
		return this.addStatDefinition(id, name, desc, 1, true);
	}

}
