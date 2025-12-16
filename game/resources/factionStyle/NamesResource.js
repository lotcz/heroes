import ObjectModel from "wgge/core/model/ObjectModel";
import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";
import StringValue from "wgge/core/model/value/StringValue";
import NumberHelper from "wgge/core/helper/NumberHelper";
import ArrayHelper from "wgge/core/helper/ArrayHelper";

export default class NamesResource extends ObjectModel {

	/**
	 * @type array
	 */
	singles;

	/**
	 * @type array
	 */
	starts;

	/**
	 * @type array
	 */
	ends;

	constructor() {
		super(true);

		this.singles = [];
		this.starts = [];
		this.ends = [];

	}

	addSingles(singles) {
		singles.forEach((s) => this.singles.push(s));
	}

	addStarts(starts) {
		starts.forEach((s) => this.starts.push(s));
	}

	addEnds(ends) {
		ends.forEach((s) => this.ends.push(s));
	}

	getSingle() {
		return ArrayHelper.random(this.singles);
	}

	getStart() {
		return ArrayHelper.random(this.starts);
	}

	getEnd() {
		return ArrayHelper.random(this.ends);
	}

	getCompound() {
		return `${this.getStart()}${this.getEnd()}`;
	}

	getName() {
		const singlesCount = this.singles.length;
		const startCount = this.starts.length;
		const endCount = this.starts.length;
		const rand = NumberHelper.random(0, singlesCount + (startCount * endCount));
		if (rand < singlesCount) {
			return this.getSingle();
		} else {
			return this.getCompound();
		}
	}
}
