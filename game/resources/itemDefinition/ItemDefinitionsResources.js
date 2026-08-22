import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import ItemDefinitionResource, {
	ITEM_TYPE_CLUTTER,
	ITEM_TYPE_CONSUMABLE,
	ITEM_TYPE_LEGS,
	ITEM_TYPE_MELEE_WEAPON,
	ITEM_TYPE_RANGED_WEAPON,
	ITEM_TYPE_SHOES,
	ITEM_TYPE_TALISMAN
} from "./ItemDefinitionResource";
import StatEffectModel from "../stats/effects/StatEffectModel";
import {
	ABILITY_STRENGTH,
	STAT_ARMOR,
	STAT_DODGING,
	STAT_HEALTH,
	STAT_HUNGER,
	STAT_MELEE_ACCURACY,
	STAT_MELEE_DAMAGE,
	STAT_RANGED_DAMAGE,
	STAT_THIRST
} from "../stats/definition/StatDefinitionsResource";

export default class ItemDefinitionsResources extends ModelNodeTable {

	constructor() {
		super((id) => new ItemDefinitionResource(id));

		// CLUTTER
		this.bones = this.addClutter('Bones', 'img/item/clutter/bones.png');
		this.dart = this.addClutter('Dart', 'img/item/weapon/dart.png');

		// CONSUMABLE
		this.meat = this.addConsumable('Meat', 'img/item/consumable/meat.png', STAT_HUNGER, 80);
		this.psilocybe = this.addConsumable('Psilocybe', 'img/item/clutter/psilocybe.png', STAT_HEALTH, 10);
		this.greenPsilocybe = this.addConsumable('Green Psilocybe', 'img/item/clutter/psilocybe-2.png', STAT_THIRST, 50);

		// TALISMAN
		this.talismanOfHealth = this.addTalisman('Amulet of health', 'img/item/clutter/amulet.png', STAT_HEALTH, 5);
		this.venus = this.addTalisman('Mother', 'img/item/clutter/venus.png', ABILITY_STRENGTH, 1);

		// LEGS
		this.skirt = this.addLegsArmor('Skirt', 'img/item/legs/skirt.png', 2);

		// SHOES
		this.shoes = this.addShoes('Shoes', 'img/item/shoes/shoes.png', 1);
		this.shoes.effects.add(new StatEffectModel('Shoes', STAT_DODGING, 15));

		// WEAPON
		// melee
		this.handAxe = this.addMeleeWeapon('Hand Axe', 'img/item/weapon/hand-axe.png', 2);
		this.spear = this.addMeleeWeapon('Spear', 'img/item/weapon/spear.png', 4);
		this.spear.effects.add(new StatEffectModel('Spear', STAT_MELEE_ACCURACY, 15));
		this.stoneAxe = this.addMeleeWeapon('Stone Axe', 'img/item/weapon/stone-axe.png', 6);
		// ranged
		this.blowpipe = this.addRangedWeapon('Blowpipe', 'img/item/weapon/blowpipe.png', 3);

	}

	addDefinition(type, name, image, effects = []) {
		const definition = new ItemDefinitionResource();
		definition.type.set(type);
		definition.name.set(name);
		definition.image.set(image);
		definition.effects.add(effects);
		return this.add(definition);
	}

	addClutter(name, image) {
		return this.addDefinition(ITEM_TYPE_CLUTTER, name, image);
	}

	addConsumable(name, image, effectType = null, effectAmount = 1) {
		return this.addDefinition(ITEM_TYPE_CONSUMABLE, name, image, effectType ? [new StatEffectModel(name, effectType, effectAmount)] : []);
	}

	addTalisman(name, image, effectType = null, effectAmount = 1) {
		return this.addDefinition(ITEM_TYPE_TALISMAN, name, image, effectType ? [new StatEffectModel(name, effectType, effectAmount)] : []);
	}

	addArmor(name, image, type, armor) {
		return this.addDefinition(type, name, image, [new StatEffectModel(name, STAT_ARMOR, armor)]);
	}

	addLegsArmor(name, image, armor) {
		return this.addArmor(name, image, ITEM_TYPE_LEGS, armor);
	}

	addShoes(name, image, armor) {
		return this.addArmor(name, image, ITEM_TYPE_SHOES, armor);
	}

	addMeleeWeapon(name, image, attack) {
		return this.addDefinition(ITEM_TYPE_MELEE_WEAPON, name, image, [new StatEffectModel(name, STAT_MELEE_DAMAGE, attack)]);
	}

	addRangedWeapon(name, image, attack) {
		return this.addDefinition(ITEM_TYPE_RANGED_WEAPON, name, image, [new StatEffectModel(name, STAT_RANGED_DAMAGE, attack)]);
	}

}
