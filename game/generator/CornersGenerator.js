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


		if (biotopeA !== biotopeB) {
			if (biotopeB === biotopeC) {
				this.setCorner(cornerA, biotopeB, 'corner-a');
			}
		}

		if (biotopeD !== biotopeB) {
			if (biotopeD === biotopeA) {
				this.setCorner(cornerB, biotopeD, 'corner-b');
			}
		}

		if (biotopeC !== biotopeA) {
			if (biotopeD === biotopeA) {
				this.setCorner(cornerC, biotopeA, 'corner-c');
			}
		}

		if (biotopeD !== biotopeC) {
			if (biotopeB === biotopeC) {
				this.setCorner(cornerD, biotopeB, 'corner-d');
			}
		}

	}

}
