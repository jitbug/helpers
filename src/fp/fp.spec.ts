import { compose, pipe } from '.';

const double = (x: number) => x * 2;
const square = (x: number) => x * x;

describe('Functional Programming Helpers', () => {
	describe('compose(...functions)', () => {
		it('should be able to compose functions', () => {
			const doubleOfSquare = compose(double, square);

			const squareOfDouble = compose(square, double);

			expect(doubleOfSquare(2)).toBe(8);
			expect(squareOfDouble(2)).toBe(16);
		});
	});

	describe('pipe(...functions)', () => {
		it('should be able to make a pipe out of functions', () => {
			const squareOfDouble = pipe(double, square);

			const doubleOfSquare = pipe(square, double);

			expect(squareOfDouble(2)).toBe(16);
			expect(doubleOfSquare(2)).toBe(8);
		});
	});
});
