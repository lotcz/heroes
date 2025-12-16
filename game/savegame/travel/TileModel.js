import ObjectModel from "wgge/core/model/ObjectModel";
import Vector2 from "wgge/core/model/vector/Vector2";
import FloatValue from "wgge/core/model/value/FloatValue";
import BoolValue from "wgge/core/model/value/BoolValue";
import IntValue from "wgge/core/model/value/IntValue";

export default class TileModel extends ObjectModel {

	/**
	 * @type Vector2
	 */
	position;

	/**
	 * @type FloatValue
	 */
	height;

	/**
	 * @type IntValue
	 */
	level;

	/**
	 * @type IntValue
	 */
	biotopeId;

	/**
	 * @type FloatValue
	 */
	population;

	/**
	 * @type BoolValue
	 */
	hasCity;

	/**
	 * @type BoolValue
	 */
	hasMonster;

	/**
	 * @type FloatValue
	 */
	discovered;

	constructor(x = 0, y = 0, height = 0, population = 0) {
		super();

		this.position = this.addProperty('position', new Vector2(x, y));
		this.height = this.addProperty('height', new FloatValue(height));

		this.level = this.addProperty('level', new IntValue());
		this.height.addOnChangeListener(() => this.updateLevel());
		this.updateLevel();

		this.population = this.addProperty('population', new FloatValue(population));
		this.biotopeId = this.addProperty('biotopeId', new IntValue());
		this.hasCity = this.addProperty('hasCity', new BoolValue(false));
		this.hasMonster = this.addProperty('hasMonster', new BoolValue(false));
		this.discovered = this.addProperty('discovered', new FloatValue(0));

	}

	updateLevel() {
		if (this.height.get() < -0.5) {
			this.level.set(0);
			return;
		}
		if (this.height.get() <= 0) {
			this.level.set(1);
			return;
		}
		if (this.height.get() <= 1.5) {
			this.level.set(2);
			return;
		}
		if (this.height.get() <= 2.5) {
			this.level.set(3);
			return;
		}
		this.level.set(4);
	}

}
