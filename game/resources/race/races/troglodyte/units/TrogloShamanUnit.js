import UnitTypeResource from "../../../../unitType/UnitTypeResource";

export default class TrogloShamanUnit extends UnitTypeResource {

	constructor(itemsDefinitions, biotopes) {
		super();

		this.name.set('Shaman');
		this.image.set('img/character/troglodyte/troglo-shaman.png');

		this.baseStats.health.baseValue.set(4);

		this.baseStats.strength.baseValue.set(4);
		this.baseStats.dexterity.baseValue.set(2);
		this.baseStats.wisdom.baseValue.set(3);

		this.baseStats.rangedWeapons.baseValue.set(2);
		this.baseStats.meleeWeapons.baseValue.set(1);
		this.baseStats.evasion.baseValue.set(2);
		this.baseStats.trading.baseValue.set(2);
		this.baseStats.fireMagic.baseValue.set(1);
		this.baseStats.waterMagic.baseValue.set(1);
		this.baseStats.natureMagic.baseValue.set(1);
		this.baseStats.bloodMagic.baseValue.set(1);

		this.baseStats.rafting.baseValue.set(1);

		this.defaultInventory.talisman1.createItem(itemsDefinitions.talismanOfHealth);

		this.addLoot(itemsDefinitions.bones);

		this.addPreferredBiotope(biotopes.tundra);
	}
}
