import { expect, test, describe } from 'vitest';
import { Tensor } from '../../src/tensor/tensor';
import { contrastStretch } from '../../src/image-operations/contrastStretch';
import fc from 'fast-check';

describe('contrast stretch', () => {
  test('all streched values are below global max', () => {
    const globalMax = 100;
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 })), vector => {
        const stretched = contrastStretch(vector, globalMax) as Array<Tensor>;
        stretched.forEach(element => {
          expect(element).toBeLessThanOrEqual(globalMax);
        });
      }),
    );
  });

  test('contrast stretch is indempotent', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 })), vector => {
        const stretched = contrastStretch(vector, 255) as Array<Tensor>;
        const doubleStreched = contrastStretch(stretched, 255) as Array<Tensor>;
        expect(stretched).toEqual(doubleStreched);
      }),
    );
  });
});
