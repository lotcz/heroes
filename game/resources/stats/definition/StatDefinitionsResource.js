import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import StatDefinitionResource from "./StatDefinitionResource";

// basic
export const STAT_LEVEL = 1;
export const STAT_EXPERIENCE = 2;
export const STAT_LEVEL_PROGRESS = 3;
export const STAT_SKILL_POINTS = 4;

export const STAT_HUNGER = 5;
export const STAT_THIRST = 6;
export const STAT_TEMPERATURE = 7;

export const STAT_FLYING = 8;
export const STAT_SWIMMING = 9;
export const STAT_WALKING = 10;
export const STAT_RAFTING = 11;

export const STAT_HEALTH = 12;
export const STAT_MOVEMENT = 13;
export const STAT_ARMOR = 14;
export const STAT_MELEE_ACCURACY = 15;
export const STAT_MELEE_DAMAGE = 16;
export const STAT_RANGED_ACCURACY = 17;
export const STAT_RANGED_DAMAGE = 18;
export const STAT_FIRE_RESISTANCE = 19;
export const STAT_POISON_RESISTANCE = 20;

// skills
export const SKILL_MELEE_WEAPONS = 101;
export const SKILL_RANGED_WEAPONS = 102;
export const SKILL_EVASION = 103;
export const SKILL_TOUGHNESS = 104;
export const SKILL_FIRE_MAGIC = 105;
export const SKILL_WATER_MAGIC = 106;
export const SKILL_NATURE_MAGIC = 107;
export const SKILL_BLOOD_MAGIC = 108;

// special
export const SYMPATHY_TOWARDS_PARTY = 201;

export default class StatDefinitionsResource extends ModelNodeTable {

	constructor() {
		super((id) => new StatDefinitionResource(id));

		this.addStat(
			STAT_LEVEL,
			'Level',
			'Level of character experience'
		);

		this.addStat(
			STAT_EXPERIENCE,
			'Experience',
			'Total gained experience'
		);

		this.addStat(
			STAT_LEVEL_PROGRESS,
			'Level',
			'Progress to the next level'
		);

		this.addStat(
			STAT_SKILL_POINTS,
			'Skill points',
			'Gained on next level, can be used to improve skills'
		);

		this.addStat(
			STAT_HUNGER,
			'Hunger',
			'Hungry characters are weakened and can even die'
		);

		this.addStat(
			STAT_THIRST,
			'Thirst',
			'Thirsty characters cannot heal and can even die'
		);

		this.addStat(
			STAT_TEMPERATURE,
			'Temperature',
			'Characters are weakened when too hot or too cold'
		);

		this.addTrait(
			STAT_FLYING,
			'Flying',
			'Flying creatures are not obstructed by mountains or water'
		);

		this.addTrait(
			STAT_SWIMMING,
			'Swimming',
			'Swimming creatures can move freely over water'
		);

		this.addTrait(
			STAT_WALKING,
			'Walking',
			'Walking creatures can move freely over dry land'
		);

		this.addTrait(
			STAT_RAFTING,
			'Rafting',
			'Ability to construct a raft'
		);

		this.addStat(
			STAT_HEALTH,
			'Health',
			'Total life energy'
		);

		this.addStat(
			STAT_MOVEMENT,
			'Movement',
			'Total movement/action points'
		);

		this.addStat(
			STAT_ARMOR,
			'Armor',
			'Resilience against physical attacks'
		);

		this.addStat(
			STAT_MELEE_ACCURACY,
			'Melee accuracy',
			'Chance to hit with melee weapons'
		);

		this.addStat(
			STAT_MELEE_DAMAGE,
			'Melee damage',
			'Amount of damage dealt with melee weapons'
		);

		this.addStat(
			STAT_RANGED_ACCURACY,
			'Ranged accuracy',
			'Chance to hit with ranged weapons'
		);

		this.addStat(
			STAT_RANGED_DAMAGE,
			'Ranged damage',
			'Amount of damage dealt with ranged weapons'
		);

		this.addStat(
			STAT_FIRE_RESISTANCE,
			'Fire resistance',
			'Resistance to fire damage'
		);

		this.addStat(
			STAT_POISON_RESISTANCE,
			'Poison resistance',
			'Resistance to poison damage'
		);

		// SKILLS

		this.addStat(
			SKILL_MELEE_WEAPONS,
			'Melee weapons',
			'Adds accuracy with clubs, axes and swords'
		);

		this.addStat(
			SKILL_RANGED_WEAPONS,
			'Ranged weapons',
			'Adds accuracy with slings, blowpipes and bows'
		);

		this.addStat(
			SKILL_EVASION,
			'Evasion',
			'Chance to evade attacks'
		);

		this.addStat(
			SKILL_TOUGHNESS,
			'Toughness',
			'Adds health'
		);

		this.addStat(
			SKILL_FIRE_MAGIC,
			'Fire magic',
			'Allows to make fire and later even some flaming weapons'
		);

		this.addStat(
			SKILL_WATER_MAGIC,
			'Water magic',
			'Allows finding water, cooking and making of magic potions'
		);

		this.addStat(
			SKILL_NATURE_MAGIC,
			'Nature magic',
			'Allows finding food, hunting and later creating magic talismans affecting animals'
		);

		this.addStat(
			SKILL_BLOOD_MAGIC,
			'Blood magic',
			'Allows making poisons and creating blood talismans affecting humans'
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
