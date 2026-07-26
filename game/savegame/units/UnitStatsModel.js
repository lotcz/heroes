import ObjectModel from "wgge/core/model/ObjectModel";
import StatModel from "../../resources/stats/StatModel";
import {
	SKILL_BLOOD_MAGIC,
	SKILL_EVASION,
	SKILL_FIRE_MAGIC,
	SKILL_MELEE_WEAPONS,
	SKILL_NATURE_MAGIC,
	SKILL_RANGED_WEAPONS,
	SKILL_TOUGHNESS,
	SKILL_WATER_MAGIC,
	STAT_ARMOR,
	STAT_EXPERIENCE,
	STAT_FIRE_RESISTANCE,
	STAT_FLYING,
	STAT_HEALTH,
	STAT_HUNGER,
	STAT_LEVEL,
	STAT_LEVEL_PROGRESS,
	STAT_MELEE_ACCURACY,
	STAT_MELEE_DAMAGE,
	STAT_MOVEMENT,
	STAT_POISON_RESISTANCE,
	STAT_RAFTING,
	STAT_RANGED_ACCURACY,
	STAT_RANGED_DAMAGE,
	STAT_SKILL_POINTS,
	STAT_SWIMMING,
	STAT_TEMPERATURE,
	STAT_THIRST,
	STAT_WALKING
} from "../../resources/stats/definition/StatDefinitionsResource";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import ExpendableStatModel from "../../resources/stats/ExpendableStatModel";
import TraitStatModel from "../../resources/stats/TraitStatModel";

export default class UnitStatsModel extends ObjectModel {

	/**
	 * @type ModelNodeCollection
	 */
	all;

	/**
	 * @type ModelNodeCollection
	 */
	basics;

	/**
	 * @type ModelNodeCollection
	 */
	expendables;

	/**
	 * @type ModelNodeCollection
	 */
	traits;

	/**
	 * @type ModelNodeCollection
	 */
	skills;

	/**
	 * @type ModelNodeCollection
	 */
	effects;

	// BASIC STATS

	/**
	 * @type StatModel
	 */
	level;

	/**
	 * @type StatModel
	 */
	experience;

	/**
	 * @type ExpendableStatModel
	 */
	levelProgress;

	/**
	 * @type StatModel
	 */
	skillPoints;

	/**
	 * @type ExpendableStatModel
	 */
	hunger;

	/**
	 * @type ExpendableStatModel
	 */
	thirst;

	/**
	 * @type ExpendableStatModel
	 */
	temperature;

	/**
	 * @type TraitStatModel
	 */
	flying;

	/**
	 * @type TraitStatModel
	 */
	swimming;

	/**
	 * @type TraitStatModel
	 */
	walking;

	/**
	 * @type TraitStatModel
	 */
	rafting;

	/**
	 * @type ExpendableStatModel
	 */
	health;

	/**
	 * @type ExpendableStatModel
	 */
	movement;

	/**
	 * @type StatModel
	 */
	armor;

	/**
	 * @type StatModel
	 */
	meleeAccuracy;

	/**
	 * @type StatModel
	 */
	meleeDamage;

	/**
	 * @type StatModel
	 */
	rangedAccuracy;

	/**
	 * @type StatModel
	 */
	rangedDamage;

	/**
	 * @type StatModel
	 */
	fireResistance;

	/**
	 * @type StatModel
	 */
	poisonResistance;

	// SKILLS

	/**
	 * @type StatModel
	 */
	meleeWeapons;

	/**
	 * @type StatModel
	 */
	rangedWeapons;

	/**
	 * @type StatModel
	 */
	evasion;

	/**
	 * @type StatModel
	 */
	toughness;

	/**
	 * @type StatModel
	 */
	fireMagic;

	/**
	 * @type StatModel
	 */
	waterMagic;

	/**
	 * @type StatModel
	 */
	natureMagic;

	/**
	 * @type StatModel
	 */
	bloodMagic;

	constructor() {
		super(true);

		this.all = this.addProperty('all', new ModelNodeCollection(null, false));

		this.basics = this.addProperty('basics', new ModelNodeCollection(null, false));
		this.basics.addEventListener('add', (stat) => this.all.add(stat));

		this.expendables = this.addProperty('expendables', new ModelNodeCollection(null, false));
		this.expendables.addEventListener('add', (stat) => this.all.add(stat));

		this.traits = this.addProperty('traits', new ModelNodeCollection(null, false));
		this.traits.addEventListener('add', (stat) => this.all.add(stat));

		this.skills = this.addProperty('skills', new ModelNodeCollection(null, false));
		this.skills.addEventListener('add', (stat) => this.all.add(stat));

		// BASIC STATS

		this.level = this.addBasic(STAT_LEVEL, 1);
		this.experience = this.addBasic(STAT_EXPERIENCE);
		this.levelProgress = this.addExpendable(STAT_LEVEL_PROGRESS);
		this.experience.effectiveValue.addOnChangeListener(
			() => {
				const currentLevelExp = (this.level.effectiveValue.get() - 1) * 100;
				const nextLevelExp = currentLevelExp + 100;
				this.levelProgress.currentValue.set(this.experience.effectiveValue.get() - currentLevelExp);
				this.levelProgress.baseValue.set(nextLevelExp - currentLevelExp);
			},
			true
		);
		this.skillPoints = this.addExpendable(STAT_SKILL_POINTS);

		this.hunger = this.addExpendable(STAT_HUNGER, 10);
		this.thirst = this.addExpendable(STAT_THIRST, 10);
		this.temperature = this.addExpendable(STAT_TEMPERATURE);

		this.flying = this.addTrait(STAT_FLYING);
		this.swimming = this.addTrait(STAT_SWIMMING);
		this.walking = this.addTrait(STAT_WALKING, 1);
		this.rafting = this.addTrait(STAT_RAFTING);

		this.health = this.addExpendable(STAT_HEALTH, 10);
		this.health.currentValue.addOnChangeListener(
			() => {
				if (this.health.currentValue.get() <= 0) this.triggerEvent('death');
			}
		);

		this.movement = this.addBasic(STAT_MOVEMENT);
		this.armor = this.addBasic(STAT_ARMOR);
		this.meleeAccuracy = this.addBasic(STAT_MELEE_ACCURACY);
		this.meleeDamage = this.addBasic(STAT_MELEE_DAMAGE);
		this.rangedAccuracy = this.addBasic(STAT_RANGED_ACCURACY);
		this.rangedDamage = this.addBasic(STAT_RANGED_DAMAGE);
		this.fireResistance = this.addBasic(STAT_FIRE_RESISTANCE);
		this.poisonResistance = this.addBasic(STAT_POISON_RESISTANCE);

		// SKILLS

		this.meleeWeapons = this.addSkill(SKILL_MELEE_WEAPONS);
		this.rangedWeapons = this.addSkill(SKILL_RANGED_WEAPONS);
		this.evasion = this.addSkill(SKILL_EVASION);
		this.toughness = this.addSkill(SKILL_TOUGHNESS);
		this.fireMagic = this.addSkill(SKILL_FIRE_MAGIC);
		this.waterMagic = this.addSkill(SKILL_WATER_MAGIC);
		this.natureMagic = this.addSkill(SKILL_NATURE_MAGIC);
		this.bloodMagic = this.addSkill(SKILL_BLOOD_MAGIC);

		// EFFECTS

		this.effects = this.addProperty('effects', new ModelNodeCollection(null, false));
		this.effects.addEventListener(
			'add',
			(effect) => {
				const defId = effect.definitionId.get();
				const stat = this.findByDef(defId);
				if (!stat) console.error('Stat to add effect not found', defId);
				stat.effects.add(effect);
			}
		);
		this.effects.addEventListener(
			'remove',
			(effect) => {
				const defId = effect.definitionId.get();
				const stat = this.findByDef(defId);
				if (!stat) console.error('Stat to remove effect not found', defId);
				stat.effects.remove(effect);
			}
		);
	}

	findByDef(definitionId) {
		return this.all.find((s) => s.definitionId.equalsTo(definitionId));
	}

	findExpendableByDef(definitionId) {
		return this.expendables.find((s) => s.definitionId.equalsTo(definitionId));
	}

	addBasic(definitionId, baseValue = 0) {
		return this.basics.add(this.addProperty(`stat-${definitionId}`, new StatModel(definitionId, baseValue)));
	}

	addExpendable(definitionId, baseValue = 1) {
		return this.expendables.add(this.addProperty(`stat-${definitionId}`, new ExpendableStatModel(definitionId, baseValue)));
	}

	addTrait(definitionId, baseValue = 0) {
		return this.traits.add(this.addProperty(`stat-${definitionId}`, new TraitStatModel(definitionId, baseValue)));
	}

	addSkill(definitionId) {
		return this.skills.add(this.addProperty(`skill-${definitionId}`, new StatModel(definitionId, 0)));
	}

	isWalking() {
		return this.walking.traitActive.get();
	}

	isSwimming() {
		return this.swimming.traitActive.get();
	}

	isFlying() {
		return this.flying.traitActive.get();
	}

	isRafting() {
		return this.rafting.traitActive.get();
	}

	canStepOnWater() {
		return this.isFlying() || this.isSwimming() || this.isRafting();
	}

	canStepOnLand() {
		return this.isFlying() || this.isWalking();
	}

}
