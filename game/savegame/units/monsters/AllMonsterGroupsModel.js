import GroupModel from "../group/GroupModel";
import TableWithNames from "../../../basic/TableWithNames";

/**
 * Table of GroupModel representing all monster groups on map
 */
export default class AllMonsterGroupsModel extends TableWithNames {

	constructor() {
		super(() => new GroupModel());

		this.addEventListener(
			'remove',
			(m) => {
				console.log('general monster removed', m.toString());
			}
		);
	}

	getAllUnits() {
		return this.reduce(
			(units, group) => {
				group.members.forEach((m) => units.push(m));
				return units;
			},
			[]
		);
	}

	getNames() {
		return this.getAllUnits().map((m) => m.name.get());
	}

}

