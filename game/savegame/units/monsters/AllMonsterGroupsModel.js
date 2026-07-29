import GroupModel from "../group/GroupModel";
import TableWithNames from "../../../resources/basic/TableWithNames";

/**
 * Table of GroupModel representing all monster groups on map
 */
export default class AllMonsterGroupsModel extends TableWithNames {

	constructor() {
		super(() => new GroupModel());
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

