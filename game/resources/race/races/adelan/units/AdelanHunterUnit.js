import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class AdelanHunterUnit extends UnitTypeResource {

	constructor(itemDefinitions, biotopes) {
		super();

		this.name.set('Hunter');
		this.image.set('img/character/adelan/adelan-hunter-2.png');

		this.baseStats.health.baseValue.set(3);

		this.baseStats.strength.baseValue.set(3);
		this.baseStats.dexterity.baseValue.set(3);
		this.baseStats.wisdom.baseValue.set(3);

		this.baseStats.rangedWeapons.baseValue.set(2);
		this.baseStats.meleeWeapons.baseValue.set(2);
		this.baseStats.evasion.baseValue.set(1);
		this.baseStats.trading.baseValue.set(1);
		this.baseStats.fireMagic.baseValue.set(1);
		this.baseStats.waterMagic.baseValue.set(0);
		this.baseStats.natureMagic.baseValue.set(1);
		this.baseStats.bloodMagic.baseValue.set(0);

		this.defaultInventory.rangedWeapon.createItem(itemDefinitions.blowpipe);

		this.addLoot(itemDefinitions.bones);

		this.addPreferredBiotope(biotopes.grassland);
	}
}
