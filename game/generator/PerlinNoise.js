export class PerlinNoise {
	constructor(seed = Math.random()) {
		this.permutation = this.buildPermutationTable(seed);
	}

	// Create a seeded permutation table
	buildPermutationTable(seed) {
		const p = new Uint8Array(256);
		for (let i = 0; i < 256; i++) p[i] = i;

		let random = this.mulberry32(seed * 0xffffffff);
		for (let i = 255; i > 0; i--) {
			const r = Math.floor(random() * (i + 1));
			[p[i], p[r]] = [p[r], p[i]];
		}

		// Duplicate for overflow
		return new Uint8Array([...p, ...p]);
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
		const X = Math.floor(x) & 255;
		const Y = Math.floor(y) & 255;

		x -= Math.floor(x);
		y -= Math.floor(y);

		const u = this.fade(x);
		const v = this.fade(y);

		const A = this.permutation[X] + Y;
		const B = this.permutation[X + 1] + Y;

		return this.lerp(
			v,
			this.lerp(
				u,
				this.grad(this.permutation[A], x, y),
				this.grad(this.permutation[B], x - 1, y)
			),
			this.lerp(
				u,
				this.grad(this.permutation[A + 1], x, y - 1),
				this.grad(this.permutation[B + 1], x - 1, y - 1)
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
