import TileCornerModel from "../savegame/tile/TileCornerModel";

export default class CornersGenerator {

	/**
	 * @type CornerMasksResource
	 */
	masks;

	constructor(masks) {
		this.masks = masks;
	}

	assignCorners(tileD, tileC, tileB, tileA) {
		const biotopeD = tileD.biotopeId.get();
		const biotopeC = tileC.biotopeId.get();
		const biotopeB = tileB.biotopeId.get();
		const biotopeA = tileA.biotopeId.get();

		if (biotopeA !== biotopeB && biotopeA !== biotopeC) {
			const cornerA = new TileCornerModel();
			cornerA.backgroundBiotopeId.set(biotopeB);
			cornerA.maskId.set(this.masks.getRandomMask('corner').id.get());
			tileA.corners.cornerA.set(cornerA);
		}

	}

}
