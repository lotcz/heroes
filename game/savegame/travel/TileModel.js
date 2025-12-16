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
	 * [-1..1]
	 */
	height;

	/**
	 * @type IntValue
	 * [0..4]
	 */
	heightLevel;

	/**
	 * @type FloatValue
	 * [-1..1]
	 */
	precipitation;

	/**
	 * @type IntValue
	 * [0..2]
	 */
	precipitationLevel;

	/**
	 * @type IntValue
	 */
	biotopeId;

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

	constructor() {
		super();

		this.position = this.addProperty('position', new Vector2());

		this.height = this.addProperty('height', new FloatValue());
		this.heightLevel = this.addProperty('heightLevel', new IntValue());
		this.height.addOnChangeListener(() => this.updateHeightLevel());
		this.updateHeightLevel();

		this.precipitation = this.addProperty('precipitation', new FloatValue());
		this.precipitationLevel = this.addProperty('precipitationLevel', new IntValue());
		this.precipitation.addOnChangeListener(() => this.updatePrecipitationLevel());
		this.updatePrecipitationLevel();

		this.biotopeId = this.addProperty('biotopeId', new IntValue());
		this.hasCity = this.addProperty('hasCity', new BoolValue(false));
		this.hasMonster = this.addProperty('hasMonster', new BoolValue(false));
		this.discovered = this.addProperty('discovered', new FloatValue(0));

	}

	updateHeightLevel() {
		if (this.height.get() < -0.05) {
			this.heightLevel.set(0);
			return;
		}
		if (this.height.get() <= 0) {
			this.heightLevel.set(1);
			return;
		}
		if (this.height.get() <= 0.15) {
			this.heightLevel.set(2);
			return;
		}
		if (this.height.get() <= 0.25) {
			this.heightLevel.set(3);
			return;
		}
		this.heightLevel.set(4);
	}

	updatePrecipitationLevel() {
		if (this.precipitation.get() < -0.05) {
			this.precipitationLevel.set(0);
			return;
		}
		if (this.precipitation.get() <= 0.25) {
			this.precipitationLevel.set(1);
			return;
		}
		this.precipitationLevel.set(2);
	}

}
