import { expect, test, describe } from 'vitest';
import { Tensor } from '@tensor/types';
import { invert } from '@image/filters/invert';
import fc from 'fast-check';
import { max } from '@tensor/properties/max';

describe('invert', () => {
  test('All scalars become 8 - scalar when 8 is max value in tensor', () => {
    const matrix: Tensor = [
      [2, 2],
      [3, 3],
      [8, 4],
    ];
    const inverted = invert(matrix);
    expect(inverted).toEqual([
      [6, 6],
      [5, 5],
      [0, 4],
    ]);
  });

  test('All scalars become max - scalar', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 1 }), vector => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const maxValue = max(vector)!;
        const inverted = invert(vector);
        vector.forEach((element, i) => {
          expect(element).toBe(maxValue - (inverted as Array<number>)[i]);
        });
      }),
    );
  });
});
