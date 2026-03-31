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
	}

	activateInternal() {
		this.game.resources.biotopes.forEach(
			(biotope) => {
				this.game.assets.loadImage(
					biotope.texture.get(),
					(texture) => {
						this.biotopesTextures.set(biotope.id.get(), this.context2d.createPattern(texture, 'repeat'));
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
				this.game.assets.loadImage(
					race.townImage.get(),
					(texture) => {
						this.imageCache.set(race.townImage.get(), texture);
						this.renderInternal();
					}
				);
			}
		);

		this.game.resources.unitTypes.forEach(
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

		this.game.assets.loadImage(
			'img/character/knight.png',
			(img) => {
				this.knight = img;
				this.renderInternal();
			}
		);

		this.game.assets.loadImage(
			'img/character/wizard.png',
			(img) => {
				this.follower1 = img;
				this.renderInternal();
			}
		);

		this.game.assets.loadImage(
			'img/character/rogue-black.png',
			(img) => {
				this.follower2 = img;
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

	renderTile(tile) {
		const tileCenter = tile.position
			.multiply(this.model.tiles.tileSizePx.get())
			.subtract(this.model.tiles.viewCenterOffsetPx)
			.add(this.canvasView.canvasCenter)
			.round();
		const tileStart = tileCenter.subtract(this.model.tiles.tileSizeHalf).round();

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

		// small rivers
		if (tile.riverStrength.get() > 0 && !tile.isRiver()) {
			this.context2d.globalCompositeOperation = 'source-atop';
			const riverBiotope = this.game.resources.biotopes.river;
			const riverTexture = this.biotopesTextures.get(riverBiotope.id.get());
			const riverNeighbors = this.model.tiles.getNeighbors(tile.position).filter((t) => t.riverStrength.get() > 0);
			riverNeighbors.forEach(
				(neighbor) => {
					const neighborCenter = neighbor.position
						.multiply(this.model.tiles.tileSizePx.get())
						.subtract(this.model.tiles.viewCenterOffsetPx)
						.add(this.canvasView.canvasCenter)
						.round();
					const thickness = NumberHelper.round(tile.riverStrength.get() * (this.model.tiles.tileSize.x / 16));
					this.context2d.beginPath();
					this.context2d.fillStyle = riverTexture;
					this.context2d.strokeStyle = riverTexture;
					this.context2d.lineWidth = thickness;
					this.context2d.lineJoin = 'round';
					this.context2d.lineCap = 'round';
					this.context2d.moveTo(tileCenter.x, tileCenter.y);
					//this.context2d.quadraticCurveTo(
					this.context2d.lineTo(
						(tileCenter.x + neighborCenter.x) / 2,
						(tileCenter.y + neighborCenter.y) / 2
					);
					this.context2d.lineTo(neighborCenter.x, neighborCenter.y);
					this.context2d.stroke();
				}
			)
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

		// fog of war
		if (tile.discovered.get() < 1) {
			this.drawRect(
				tileStart,
				this.model.tiles.tileSize,
				`rgba(0, 0, 0, ${1 - tile.discovered.get()})`
			);
		}
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

		for (let x = start.x; x <= end.x; x++) {
			for (let y = start.y; y <= end.y; y++) {
				const tile = this.model.tiles.getTile(x, y);
				if (tile && tile.discovered.get() > 0) {
					this.renderTile(tile);
				}
			}
		}

		// monsters
		for (let x = start.x; x <= end.x; x++) {
			for (let y = start.y; y <= end.y; y++) {
				const tile = this.model.tiles.getTile(x, y);
				if (tile && tile.discovered.get() > 0 && tile.monster.isSet()) {
					const monster = tile.monster.get();
					const monsterTexture = this.imageCache.get(monster.unitType.get().image.get());
					const tileStart = monster.position
						.multiply(this.model.tiles.tileSizePx.get())
						.subtract(this.model.tiles.viewCenterOffsetPx)
						.add(this.canvasView.canvasCenter)
						.subtract(this.model.tiles.tileSizeHalf)
						.round();
					if (monsterTexture) {
						this.drawImage(
							monsterTexture,
							tileStart,
							this.model.tiles.tileSize,
							new Vector2(0, 0),
							new Vector2(monsterTexture.width, monsterTexture.height),
							1,
							false
						);
					}
				}
			}
		}

		// hero
		if (this.model.heroPosition.isInside(start, size)) {
			const tile = this.model.tiles.getTile(this.model.heroPosition.round());

			const tileCenter = this.model.heroPosition
				.multiply(this.model.tiles.tileSizePx.get())
				.subtract(this.model.tiles.viewCenterOffsetPx)
				.add(this.canvasView.canvasCenter)
				.round();

			const tileStart = tileCenter.subtract(this.model.tiles.tileSizeHalf).round();

			const padding = new Vector2(0, this.model.tiles.tileSize.y * 0.1);
			const leaderSize = this.model.tiles.tileSize.multiply(0.75);
			const followerSize = leaderSize.multiply(0.85);

			if (tile.isWater()) {
				// ship
				if (this.ship) {
					this.drawImage(
						this.ship,
						tileStart,
						this.model.tiles.tileSize,
						new Vector2(0, 0),
						new Vector2(this.ship.width, this.ship.height),
						1,
						false
					);
				}
			}

			// follower 1
			if (this.follower1) {
				this.drawImage(
					this.follower1,
					tileStart.add(padding),
					followerSize,
					new Vector2(0, 0),
					new Vector2(this.follower1.width, this.follower1.height),
					1,
					false
				);
			}

			// follower 2
			if (this.follower2) {
				this.drawImage(
					this.follower2,
					tileStart.add(new Vector2(this.model.tiles.tileSize.x - padding.x - followerSize.x, padding.y)),
					followerSize,
					new Vector2(0, 0),
					new Vector2(this.follower2.width, this.follower2.height),
					1,
					false
				);
			}

			// leader
			if (this.knight) {
				this.drawImage(
					this.knight,
					new Vector2(tileCenter.x - (leaderSize.x / 2), tileStart.y + this.model.tiles.tileSize.y - padding.y - leaderSize.y),
					leaderSize,
					new Vector2(0, 0),
					new Vector2(this.knight.width, this.knight.height),
					1,
					false
				);
			}

		}
	}

}
