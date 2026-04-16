import CanvasRenderer from "wgge/core/renderer/canvas/CanvasRenderer";
import Vector2 from "wgge/core/model/vector/Vector2";
import Dictionary from "wgge/core/Dictionary";
import NumberHelper from "wgge/core/helper/NumberHelper";

export default class TilesCanvasRenderer extends CanvasRenderer {

	/**
	 * @type TravelModel
	 */
	model;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;
		this.canvasView = this.model.mainView;

		this.biotopesTextures = new Dictionary();
		this.imageCache = new Dictionary();
		this.cornerMasks = new Dictionary();

		this.riverBiotope = this.game.resources.biotopes.river;
		this.riverTexture = null;
		this.beachBiotope = this.game.resources.biotopes.beach;
		this.beachTexture = null;
	}

	activateInternal() {
		this.game.resources.biotopes.forEach(
			(biotope) => {
				this.game.assets.loadImage(
					biotope.texture.get(),
					(texture) => {
						const pattern = this.context2d.createPattern(texture, 'repeat');
						this.biotopesTextures.set(biotope.id.get(), pattern);
						if (this.riverBiotope.equalsTo(biotope)) this.riverTexture = pattern;
						if (this.beachBiotope.equalsTo(biotope)) this.beachTexture = pattern;
						this.renderInternal();
					}
				);
				biotope.decorations.forEach(
					(decor) => {
						this.game.assets.loadImage(
							decor.image.get(),
							(texture) => {
								this.imageCache.set(decor.image.get(), texture);
								this.renderInternal();
							}
						);
					}
				);
			}
		);

		this.game.resources.races.forEach(
			(race) => {
				const townImage = race.townImage.get();
				if (townImage) {
					this.game.assets.loadImage(
						townImage,
						(texture) => {
							this.imageCache.set(townImage, texture);
							this.renderInternal();
						}
					);
				}

				race.unitTypes.forEach(
					(unitType) => {
						this.game.assets.loadImage(
							unitType.image.get(),
							(texture) => {
								this.imageCache.set(unitType.image.get(), texture);
								this.renderInternal();
							}
						);
					}
				);
			}
		);

		this.game.resources.cornerMasks.forEach(
			(mask) => {
				this.game.assets.loadImage(
					mask.image.get(),
					(texture) => {
						this.cornerMasks.set(mask.id.get(), texture);
						this.renderInternal();
					}
				);
			}
		);

		this.game.resources.itemDefinitions.forEach(
			(itemDefinition) => {
				this.game.assets.loadImage(
					itemDefinition.image.get(),
					(texture) => {
						this.imageCache.set(itemDefinition.image.get(), texture);
						this.renderInternal();
					}
				);
			}
		);

		this.game.assets.loadImage(
			'img/character/splatter.png',
			(img) => {
				this.splatter = img;
				this.renderInternal();
			}
		);

		this.game.assets.loadImage(
			'img/character/raft.png',
			(img) => {
				this.ship = img;
				this.renderInternal();
			}
		);

	}

	getTileCenter(tile) {
		return tile.position
			.multiply(this.model.tiles.tileSizePx.get())
			.subtract(this.model.tiles.viewCenterOffsetPx)
			.add(this.canvasView.canvasCenter)
			.round();
	}

	getTileStartFromTileCenter(center) {
		return center.subtract(this.model.tiles.tileSizeHalf).round();
	}

	getTileStart(tile) {
		return this.getTileStartFromTileCenter(this.getTileCenter(tile));
	}

	renderCorner(corner, start) {
		const mask = this.cornerMasks.get(corner.maskId.get());
		const bg = this.biotopesTextures.get(corner.backgroundBiotopeId.get());
		if (mask) {
			this.context2d.globalCompositeOperation = 'source-over';
			this.drawImage(
				mask,
				start,
				this.model.tiles.tileSizeHalf,
				new Vector2(0, 0),
				new Vector2(mask.width, mask.height),
				1,
				false
			);
			this.context2d.globalCompositeOperation = 'source-atop';
			this.drawRect(start, this.model.tiles.tileSizeHalf, bg ? bg : 'black');
		}
	}

	renderUnit(start, unit, size = 1) {
		const unitType = unit.unitType.get();
		const monsterTexture = this.imageCache.get(unitType.image.get());
		if (monsterTexture) {
			this.drawImage(
				monsterTexture,
				start,
				this.model.tiles.tileSize.multiply(size),
				new Vector2(0, 0),
				new Vector2(monsterTexture.width, monsterTexture.height),
				1,
				false
			);
		}
	}

	renderGroup(tile, group) {
		const tileStart = this.getTileStart(tile).add(
			new Vector2(
				this.model.tiles.tileSize.x * group.renderingOffset.x,
				this.model.tiles.tileSize.y * group.renderingOffset.y
			)
		).round();
		if (group === this.model.party && tile.isWater()) {
			// ship
			if (this.ship) {
				this.drawImage(
					this.ship,
					tileStart.add(new Vector2(0, this.model.tiles.tileSize.y * 0.1)),
					this.model.tiles.tileSize,
					new Vector2(0, 0),
					new Vector2(this.ship.width, this.ship.height),
					1,
					false
				);
			}
		}
		if (group.members.count() === 1) {
			this.renderUnit(tileStart, group.members.get(0));
			return;
		}

	}

	renderTileBg(tile) {
		const tileStart = this.getTileStart(tile);

		// corners
		if (tile.corners.cornerA.isSet()) {
			this.renderCorner(tile.corners.cornerA.get(), tileStart);
		}
		if (tile.corners.cornerB.isSet()) {
			this.renderCorner(tile.corners.cornerB.get(), new Vector2(tileStart.x + this.model.tiles.tileSizeHalf.x, tileStart.y));
		}
		if (tile.corners.cornerC.isSet()) {
			this.renderCorner(tile.corners.cornerC.get(), new Vector2(tileStart.x, tileStart.y + this.model.tiles.tileSizeHalf.y));
		}
		if (tile.corners.cornerD.isSet()) {
			this.renderCorner(tile.corners.cornerD.get(), tileStart.add(this.model.tiles.tileSizeHalf));
		}

		// texture
		const texture = this.biotopesTextures.get(tile.biotopeId.get());
		if (texture) {
			this.context2d.globalCompositeOperation = 'destination-over';
			this.drawRect(tileStart, this.model.tiles.tileSize, texture);
		}
	}

	renderTileFg(tile) {
		const tileCenter = this.getTileCenter(tile);
		const tileStart = this.getTileStartFromTileCenter(tileCenter);

		// small rivers
		if (tile.hasRiverStream()) {
			this.context2d.globalCompositeOperation = 'source-atop';

			this.context2d.beginPath();
			this.context2d.lineJoin = 'round';
			this.context2d.lineCap = 'round';
			this.context2d.globalAlpha = 1;
			this.context2d.strokeStyle = this.riverTexture;

			tile.rivers.forEach(
				(river) => {
					const neighborCenter = river.targetPosition
						.multiply(this.model.tiles.tileSizePx.get())
						.subtract(this.model.tiles.viewCenterOffsetPx)
						.add(this.canvasView.canvasCenter);
					const middle = tileCenter.add(neighborCenter).multiply(0.5).round();
					const jitterPoint = tileCenter.add(middle).multiply(0.5).add(
						new Vector2(
							this.model.tiles.tileSizePx.get() * river.jitter.x,
							this.model.tiles.tileSizePx.get() * river.jitter.y
						)
					);
					const tu = this.model.tiles.tileSize.x / 20;
					const thickness = NumberHelper.round(tu * (1 + (river.strength.get() / 5)));

					this.context2d.lineWidth = thickness;
					this.context2d.moveTo(tileCenter.x, tileCenter.y);
					this.context2d.quadraticCurveTo(
						jitterPoint.x,
						jitterPoint.y,
						middle.x,
						middle.y
					);

					if (false) {
						this.context2d.save();
						this.context2d.beginPath();
						this.context2d.moveTo(tileCenter.x, tileCenter.y);
						this.context2d.strokeStyle = 'red';
						this.context2d.lineWidth = 2;
						this.context2d.lineTo(middle.x, middle.y);
						this.context2d.arc(middle.x, middle.y, 5, 0, 360);
						this.context2d.stroke();
						this.context2d.restore();
					}

				}
			);

			this.context2d.stroke();
		}

		this.context2d.globalCompositeOperation = 'source-over';

		// decoration
		if (tile.decor.isSet()) {
			const decor = tile.decor.get();
			const decorTexture = this.imageCache.get(decor.image.get());
			if (decorTexture) {
				this.drawImage(
					decorTexture,
					tileStart,
					this.model.tiles.tileSize,
					new Vector2(0, 0),
					new Vector2(decorTexture.width, decorTexture.height),
					1,
					false
				);
			}
		}

		// location
		if (tile.location.isSet()) {
			const location = tile.location.get();
			const locationTexture = this.imageCache.get(location.image.get());
			if (locationTexture) {
				this.drawImage(
					locationTexture,
					tileStart,
					this.model.tiles.tileSize,
					new Vector2(0, 0),
					new Vector2(locationTexture.width, locationTexture.height),
					1,
					false
				);
			}
		}

		// items
		tile.items.forEach(
			(item) => {
				const itemDefinition = item.itemDefinition.get();
				const itemTexture = this.imageCache.get(itemDefinition.image.get());
				if (itemTexture) {
					this.drawImage(
						itemTexture,
						tileStart,
						this.model.tiles.tileSize,
						new Vector2(0, 0),
						new Vector2(itemTexture.width, itemTexture.height),
						1,
						false
					);
				}
			}
		);

	}

	renderInternal() {
		// clear
		this.context2d.clearRect(0, 0, this.canvasView.canvasSize.x, this.canvasView.canvasSize.y);

		// texture offset
		if (this.model.tiles.viewCenterOffsetPx.isDirty) {
			this.biotopesTextures.forEach(
				(id, texture) => {
					const matrix = new DOMMatrix();
					matrix.translateSelf(-this.model.tiles.viewCenterOffsetPx.x, -this.model.tiles.viewCenterOffsetPx.y);
					texture.setTransform(matrix);
				}
			);
		}

		// tiles
		const tilesInView = this.canvasView.canvasSize.multiply(1 / this.model.tiles.tileSizePx.get());
		const tilesViewCenter = tilesInView.multiply(0.5);
		const tilesViewStart = this.model.tiles.viewCenterTile.subtract(tilesViewCenter);

		const start = new Vector2(Math.floor(tilesViewStart.x), Math.floor(tilesViewStart.y));
		const size = new Vector2(Math.round(tilesInView.x + 1), Math.round(tilesInView.y + 1));
		const end = start.add(size);

		// bg
		for (let x = start.x; x <= end.x; x++) {
			for (let y = start.y; y <= end.y; y++) {
				const tile = this.model.tiles.getTile(x, y);
				if (tile && tile.discovered.get() > 0) {
					this.renderTileBg(tile);
				}
			}
		}

		// fg
		for (let x = start.x; x <= end.x; x++) {
			for (let y = start.y; y <= end.y; y++) {
				const tile = this.model.tiles.getTile(x, y);
				if (tile && tile.discovered.get() > 0) {
					this.renderTileFg(tile);
				}
			}
		}

		// groups
		this.context2d.globalCompositeOperation = 'source-atop';
		for (let x = start.x; x <= end.x; x++) {
			for (let y = start.y; y <= end.y; y++) {
				const tile = this.model.tiles.getTile(x, y);
				if (tile && tile.discovered.get() > 0 && tile.group.isSet()) {
					this.renderGroup(tile, tile.group.get());
				}
			}
		}

	}

}
