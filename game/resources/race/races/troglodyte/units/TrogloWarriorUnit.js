import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class TrogloWarriorUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Warrior');
		this.image.set('img/character/troglodyte/troglo-warrior.png');

		this.baseStats.health.baseValue.set(4);

		this.baseStats.strength.baseValue.set(6);
		this.baseStats.dexterity.baseValue.set(2);
		this.baseStats.wisdom.baseValue.set(1);

		this.baseStats.rangedWeapons.baseValue.set(1);
		this.baseStats.meleeWeapons.baseValue.set(4);
		this.baseStats.evasion.baseValue.set(2);
		this.baseStats.trading.baseValue.set(1);
		this.baseStats.fireMagic.baseValue.set(0);
		this.baseStats.waterMagic.baseValue.set(0);
		this.baseStats.natureMagic.baseValue.set(0);
		this.baseStats.bloodMagic.baseValue.set(0);

		this.defaultInventory.meleeWeapon.createItem(itemDefinitions.handAxe);

		this.addLoot(itemDefinitions.bones);

		this.addPreferredBiotope(biotopes.tundra);
		this.addPreferredBiotope(biotopes.hills);
	}
}
