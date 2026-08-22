import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class KalingaWarriorUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Warrior');
		this.image.set('img/character/kalinga/kalinga-warrior.png');

		this.baseStats.health.baseValue.set(3);

		this.baseStats.strength.baseValue.set(4);
		this.baseStats.dexterity.baseValue.set(3);
		this.baseStats.wisdom.baseValue.set(2);

		this.baseStats.rangedWeapons.baseValue.set(3);
		this.baseStats.meleeWeapons.baseValue.set(4);
		this.baseStats.evasion.baseValue.set(3);
		this.baseStats.trading.baseValue.set(2);
		this.baseStats.fireMagic.baseValue.set(1);
		this.baseStats.waterMagic.baseValue.set(1);
		this.baseStats.natureMagic.baseValue.set(0);
		this.baseStats.bloodMagic.baseValue.set(1);

		this.defaultInventory.meleeWeapon.createItem(itemDefinitions.handAxe);

		this.addLoot(itemDefinitions.bones);

		this.addPreferredBiotope(biotopes.jungle);
	}
}
