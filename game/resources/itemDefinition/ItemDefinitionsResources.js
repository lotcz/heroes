import ModelNodeTable from "wgge/core/model/collection/table/ModelNodeTable";
import ItemDefinitionResource, {
	ITEM_TYPE_CLUTTER,
	ITEM_TYPE_CONSUMABLE,
	ITEM_TYPE_MELEE_WEAPON,
	ITEM_TYPE_TALISMAN
} from "./ItemDefinitionResource";
import StatEffectModel from "../stats/effects/StatEffectModel";
import {STAT_HEALTH, STAT_HUNGER, STAT_MELEE_DAMAGE, STAT_THIRST} from "../stats/definition/StatDefinitionsResource";

export default class ItemDefinitionsResources extends ModelNodeTable {

	constructor() {
		super((id) => new ItemDefinitionResource(id));

		// CLUTTER
		this.bones = this.addClutter('Bones', 'img/item/clutter/bones.png');

		// CONSUMABLE
		this.meat = this.addConsumable('Meat', 'img/item/consumable/meat.png', STAT_HUNGER, 10);
		this.psilocybe = this.addConsumable('Psilocybe', 'img/item/clutter/psilocybe.png', STAT_HUNGER, 2);
		this.greenPsilocybe = this.addConsumable('Green Psilocybe', 'img/item/clutter/psilocybe-2.png', STAT_THIRST, 5);

		// TALISMAN
		this.amulet = this.addTalisman('Amulet of health', 'img/item/clutter/amulet.png', STAT_HEALTH, 5);

		// WEAPON
		this.handAxe = this.addMeleeWeapon('Hand Axe', 'img/item/weapon/hand-axe.png', 2);
		this.stoneAxe = this.addMeleeWeapon('Stone Axe', 'img/item/weapon/stone-axe.png', 4);

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

	addMeleeWeapon(name, image, attack) {
		return this.addDefinition(ITEM_TYPE_MELEE_WEAPON, name, image, [new StatEffectModel(name, STAT_MELEE_DAMAGE, attack)]);
	}

}
