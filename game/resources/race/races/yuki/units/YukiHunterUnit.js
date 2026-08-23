import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class YukiHunterUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Hunter');
		this.image.set('img/character/yuki/yuki-hunter-2.png');

		this.baseStats.health.baseValue.set(3);

		this.baseStats.strength.baseValue.set(2);
		this.baseStats.dexterity.baseValue.set(4);
		this.baseStats.wisdom.baseValue.set(3);

		this.baseStats.rangedWeapons.baseValue.set(1);
		this.baseStats.meleeWeapons.baseValue.set(1);
		this.baseStats.evasion.baseValue.set(1);
		this.baseStats.trading.baseValue.set(2);
		this.baseStats.fireMagic.baseValue.set(1);
		this.baseStats.waterMagic.baseValue.set(2);
		this.baseStats.natureMagic.baseValue.set(0);
		this.baseStats.bloodMagic.baseValue.set(0);

		this.baseStats.rafting.baseValue.set(1);

		this.defaultInventory.meleeWeapon.createItem(itemDefinitions.spear);

		this.addLoot(itemDefinitions.bones);

		this.addPreferredBiotope(biotopes.snow);
		this.addPreferredBiotope(biotopes.peaks);
	}
}
