import IdentifiedModelNode from "wgge/core/model/collection/table/IdentifiedModelNode";
import StringValue from "wgge/core/model/value/StringValue";
import NamesResource from "./NamesResource";

export default class FactionStyleResource extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type NamesResource
	 */
	maleNames;

	/**
	 * @type NamesResource
	 */
	femaleNames;

	/**
	 * @type NamesResource
	 */
	locationNames;

	/**
	 * @type StringValue
	 */
	townImage;

	constructor(id) {
		super(id);

		this.name = this.addProperty('name', new StringValue());
		this.maleNames = this.addProperty('maleNames', new NamesResource());
		this.femaleNames = this.addProperty('femaleNames', new NamesResource());
		this.locationNames = this.addProperty('locationNames', new NamesResource());
		this.townImage = this.addProperty('townImage', new StringValue());

	}
}
