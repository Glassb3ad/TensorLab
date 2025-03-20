import { expect, test, describe } from 'vitest';
import { gamma } from '../../src/image-operations/gamma';
import fc from 'fast-check';
import { Tensor } from '../../src/tensor';

describe('gamma', () => {
  test('Increase scalar when gamma is 0 < gamma < 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 100 }),
        fc.float({ min: 0, max: 1, minExcluded: true, maxExcluded: true, noNaN: true }),
        (scalar, gammaValue) => {
          const gammatized = gamma(scalar, gammaValue);
          expect(gammatized).toBeGreaterThan(scalar);
        },
      ),
    );
  });

  test('Decrease scalar when gamma value is over 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 100 }),
        fc.float({ min: 1, max: 2, minExcluded: true, noNaN: true }),
        (scalar, gammaValue) => {
          const gammatized = gamma(scalar, gammaValue);
          expect(gammatized).toBeLessThan(scalar);
        },
      ),
    );
  });

  test('Scalar does not change when gamma value is 1', () => {
    const gammaValue = 1;
    fc.assert(
      fc.property(fc.integer({ min: 2, max: 100 }), scalar => {
        const gammatized = gamma(scalar, gammaValue);
        expect(gammatized).toBe(scalar);
      }),
    );
  });

  test('Scalar turns to max 255 when gamma value is 0', () => {
    const gammaValue = 0;
    fc.assert(
      fc.property(fc.integer({ min: 2, max: 100 }), scalar => {
        const gammatized = gamma(scalar, gammaValue);
        expect(gammatized).toBe(255);
      }),
    );
  });

  test('Gamma changes scalars in matrix', () => {
    const matrix = [
      [2, 2],
      [3, 3],
    ];
    const gammatized = gamma(matrix, 0.5) as Array<Array<Tensor>>;
    matrix.forEach((vector, i) => {
      vector.forEach((element, j) => {
        expect(element).not.toBe(gammatized[i][j]);
      });
    });
  });
});
