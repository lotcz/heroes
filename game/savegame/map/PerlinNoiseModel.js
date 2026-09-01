import ObjectModel from "wgge/core/model/ObjectModel";
import FloatValue from "wgge/core/model/value/FloatValue";

export class PerlinNoiseModel extends ObjectModel {

	/**
	 * @type Uint8Array|null
	 */
	permutationTable;

	/**
	 * @type FloatValue
	 */
	seed;

	constructor(seed = Math.random()) {
		super();

		this.seed = this.addProperty('seed', new FloatValue(seed));
		this.seed.addEventListener('change', () => this.permutationTable = null, true);
	}

	// Create a seeded permutation table
	buildPermutationTable() {
		this.permutationTable = new Uint8Array(256);
		for (let i = 0; i < 256; i++) this.permutationTable[i] = i;

		let rand = this.mulberry32(this.seed.get() * 0xffffffff);
		for (let i = 255; i > 0; i--) {
			const r = Math.floor(rand() * (i + 1));
			const inter = this.permutationTable[i];
			this.permutationTable[i] = this.permutationTable[r];
			this.permutationTable[r] = inter;
		}
	}

	getPermutation(v) {
		if (!this.permutationTable) this.buildPermutationTable();
		return this.permutationTable[v % this.permutationTable.length];
	}

	// Deterministic PRNG
	mulberry32(a) {
		return function () {
			a |= 0;
			a = (a + 0x6D2B79F5) | 0;
			let t = Math.imul(a ^ (a >>> 15), 1 | a);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	// Fade curve
	fade(t) {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

	// Linear interpolation
	lerp(t, a, b) {
		return a + t * (b - a);
	}

	// Gradient function
	grad(hash, x, y) {
		const h = hash & 3;
		const u = h < 2 ? x : y;
		const v = h < 2 ? y : x;
		return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
	}

	// 2D Perlin noise
	noise(x, y) {
		const xi = Math.floor(x);
		const yi = Math.floor(y);

		const xs = xi & 255;
		const ys = yi & 255;

		x -= xi;
		y -= yi;

		const u = this.fade(x);
		const v = this.fade(y);

		const A = this.getPermutation(xs) + ys;
		const B = this.getPermutation(xs + 1) + ys;

		return this.lerp(
			v,
			this.lerp(
				u,
				this.grad(this.getPermutation(A), x, y),
				this.grad(this.getPermutation(B), x - 1, y)
			),
			this.lerp(
				u,
				this.grad(this.getPermutation(A + 1), x, y - 1),
				this.grad(this.getPermutation(B + 1), x - 1, y - 1)
			)
		);
	}

	fractalNoise(
		x,
		y,
		octaves = 4,
		lacunarity = 2,
		gain = 0.5
	) {
		let amplitude = 1;
		let frequency = 1;
		let sum = 0;
		let max = 0;

		for (let i = 0; i < octaves; i++) {
			sum += this.noise(x * frequency, y * frequency) * amplitude;
			max += amplitude;
			amplitude *= gain;
			frequency *= lacunarity;
		}

		return sum / max;
	}

}
