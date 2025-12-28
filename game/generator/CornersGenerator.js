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
		const cornerD = tileD.corners.cornerD;
		const cornerC = tileC.corners.cornerC;
		const cornerB = tileB.corners.cornerB;
		const cornerA = tileA.corners.cornerA;
		const biotopeD = tileD.biotopeId.get();
		const biotopeC = tileC.biotopeId.get();
		const biotopeB = tileB.biotopeId.get();
		const biotopeA = tileA.biotopeId.get();

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
