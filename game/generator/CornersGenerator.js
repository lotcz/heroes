import TileCornerModel from "../savegame/tile/TileCornerModel";

export default class CornersGenerator {

	/**
	 * @type CornerMasksResource
	 */
	masks;

	constructor(masks) {
		this.masks = masks;
	}

	setCorner(corner, biotopeId, type) {
		const cornerM = new TileCornerModel();
		cornerM.backgroundBiotopeId.set(biotopeId);
		cornerM.maskId.set(this.masks.getRandomMask(type).id.get());
		corner.set(cornerM);
	}

	assignCorners(tileD, tileC, tileB, tileA) {
		const cornerD = tileD?.corners.cornerD;
		const cornerC = tileC?.corners.cornerC;
		const cornerB = tileB?.corners.cornerB;
		const cornerA = tileA?.corners.cornerA;
		const biotopeD = tileD?.biotopeId.get();
		const biotopeC = tileC?.biotopeId.get();
		const biotopeB = tileB?.biotopeId.get();
		const biotopeA = tileA?.biotopeId.get();

		// no corners available
		if (cornerD === undefined && cornerC === undefined && cornerB === undefined && cornerA === undefined) {
			return;
		}

		// no corners needed
		if (biotopeA === biotopeB && biotopeB === biotopeC && biotopeC === biotopeD && biotopeD === biotopeA) {
			return;
		}

		// map edge - upper left corner
		if (cornerD === undefined && cornerC === undefined && cornerB === undefined) {
			this.setCorner(cornerA, null, 'corner-a');
			return;
		}

		// map edge - upper right corner
		if (cornerD === undefined && cornerC === undefined && cornerA === undefined) {
			this.setCorner(cornerB, null, 'corner-b');
			return;
		}

		// map edge - lower left corner
		if (cornerD === undefined && cornerB === undefined && cornerA === undefined) {
			this.setCorner(cornerC, null, 'corner-c');
			return;
		}

		// map edge - lower right corner
		if (cornerC === undefined && cornerB === undefined && cornerA === undefined) {
			this.setCorner(cornerD, null, 'corner-d');
			return;
		}

		// map edge - top
		if (cornerD === undefined && cornerC === undefined) {
			this.setCorner(cornerB, null, 'side-t');
			this.setCorner(cornerA, null, 'side-t');
			return;
		}

		// map edge - bottom
		if (cornerB === undefined && cornerA === undefined) {
			this.setCorner(cornerD, null, 'side-b');
			this.setCorner(cornerC, null, 'side-b');
			return;
		}

		// map edge - left
		if (cornerD === undefined && cornerB === undefined) {
			this.setCorner(cornerC, null, 'side-l');
			this.setCorner(cornerA, null, 'side-l');
			return;
		}

		// map edge - right
		if (cornerA === undefined && cornerC === undefined) {
			this.setCorner(cornerB, null, 'side-r');
			this.setCorner(cornerD, null, 'side-r');
			return;
		}

		// horizontal line
		if (biotopeB !== biotopeD && biotopeC === biotopeD && biotopeA === biotopeB) {
			if (Math.random() < 0.5) {
				this.setCorner(cornerD, biotopeB, 'side-b');
				this.setCorner(cornerA, biotopeC, 'side-t');
			} else {
				this.setCorner(cornerB, biotopeD, 'side-t');
				this.setCorner(cornerC, biotopeA, 'side-b');
			}
			return;
		}

		// vertical line
		if (biotopeB !== biotopeA && biotopeC === biotopeA && biotopeD === biotopeB) {
			if (Math.random() < 0.5) {
				this.setCorner(cornerD, biotopeC, 'side-r');
				this.setCorner(cornerA, biotopeB, 'side-l');
			} else {
				this.setCorner(cornerC, biotopeD, 'side-l');
				this.setCorner(cornerB, biotopeA, 'side-r');
			}
			return;
		}

		// cross
		if (biotopeB === biotopeC && biotopeD === biotopeA && biotopeB !== biotopeD) {
			if (Math.random() < 0.5) {
				this.setCorner(cornerD, biotopeC, 'corner-d');
				this.setCorner(cornerA, biotopeB, 'corner-a');
			} else {
				this.setCorner(cornerC, biotopeD, 'corner-c');
				this.setCorner(cornerB, biotopeA, 'corner-b');
			}
			return;
		}

		// t-bone horizontal - top
		if (biotopeD === biotopeC && biotopeD !== biotopeB && biotopeC !== biotopeA && biotopeB !== biotopeA) {
			if (Math.random() < 0.5) {
				this.setCorner(cornerD, biotopeB, 'side-b');
				this.setCorner(cornerC, biotopeA, 'side-b');
				this.setCorner(cornerA, biotopeB, 'side-l');
			} else {
				this.setCorner(cornerD, biotopeB, 'side-b');
				this.setCorner(cornerA, biotopeC, 'side-t');
				this.setCorner(cornerB, biotopeA, 'side-r');
			}
			return;
		}

		// t-bone horizontal - bottom
		if (biotopeB === biotopeA && biotopeB !== biotopeD && biotopeA !== biotopeC && biotopeD !== biotopeC) {
			if (Math.random() < 0.5) {
				this.setCorner(cornerD, biotopeC, 'side-r');
				this.setCorner(cornerB, biotopeD, 'side-t');
				this.setCorner(cornerA, biotopeC, 'side-t');
			} else {
				this.setCorner(cornerC, biotopeD, 'side-l');
				this.setCorner(cornerD, biotopeB, 'side-b');
				this.setCorner(cornerA, biotopeC, 'side-t');
			}
			return;
		}

		// t-bone vertical - left
		if (biotopeB === biotopeD && biotopeB !== biotopeA && biotopeA !== biotopeC && biotopeD !== biotopeC) {
			if (Math.random() < 0.5) {
				this.setCorner(cornerA, biotopeC, 'side-t');
				this.setCorner(cornerC, biotopeD, 'side-l');
				this.setCorner(cornerB, biotopeA, 'side-r');
			} else {
				this.setCorner(cornerC, biotopeA, 'side-b');
				this.setCorner(cornerA, biotopeB, 'side-l');
				this.setCorner(cornerD, biotopeC, 'side-r');
			}
			return;
		}

		// t-bone vertical - right
		if (biotopeC === biotopeA && biotopeB !== biotopeA && biotopeD !== biotopeC && biotopeD !== biotopeB) {
			if (Math.random() < 0.5) {
				this.setCorner(cornerD, biotopeB, 'side-b');
				this.setCorner(cornerB, biotopeA, 'side-r');
				this.setCorner(cornerC, biotopeD, 'side-l');
			} else {
				this.setCorner(cornerB, biotopeD, 'side-t');
				this.setCorner(cornerD, biotopeC, 'side-r');
				this.setCorner(cornerA, biotopeB, 'side-l');
			}
			return;
		}

		// diagonal 1
		if (biotopeA === biotopeD && biotopeA !== biotopeB && biotopeA !== biotopeC && biotopeB !== biotopeC) {
			this.setCorner(cornerB, biotopeA, 'corner-b');
			this.setCorner(cornerC, biotopeA, 'corner-c');
			return;
		}

		// diagonal 2
		if (biotopeB === biotopeC && biotopeB !== biotopeD && biotopeB !== biotopeA && biotopeA !== biotopeD) {
			this.setCorner(cornerD, biotopeB, 'corner-d');
			this.setCorner(cornerA, biotopeB, 'corner-a');
			return;
		}

		// 4
		if (biotopeA !== biotopeB && biotopeA !== biotopeC && biotopeA !== biotopeD && biotopeB !== biotopeC && biotopeB !== biotopeD && biotopeC !== biotopeD) {
			if (Math.random() < 0.5) {
				this.setCorner(cornerD, biotopeC, 'side-r');
				this.setCorner(cornerC, biotopeA, 'side-b');
				this.setCorner(cornerA, biotopeB, 'side-l');
				this.setCorner(cornerB, biotopeD, 'side-t');
			} else {
				this.setCorner(cornerD, biotopeB, 'side-b');
				this.setCorner(cornerB, biotopeA, 'side-r');
				this.setCorner(cornerA, biotopeC, 'side-t');
				this.setCorner(cornerC, biotopeD, 'side-l');
			}
			return;
		}

		// lone corner-a
		if (biotopeA !== biotopeB && biotopeB === biotopeD && biotopeD === biotopeC) {
			this.setCorner(cornerA, biotopeB, 'corner-a');
			return;
		}

		// lone corner-b
		if (biotopeD !== biotopeB && biotopeD === biotopeC && biotopeC === biotopeA) {
			this.setCorner(cornerB, biotopeD, 'corner-b');
			return;
		}

		// lone corner-c
		if (biotopeC !== biotopeA && biotopeD === biotopeA && biotopeA === biotopeB) {
			this.setCorner(cornerC, biotopeA, 'corner-c');
			return;
		}

		// lone corner-d
		if (biotopeD !== biotopeC && biotopeB === biotopeC && biotopeC === biotopeA) {
			this.setCorner(cornerD, biotopeB, 'corner-d');
			return;
		}

		console.warn('Strange, no corner found for tiles', biotopeA, biotopeB, biotopeC, biotopeD);

	}

}
