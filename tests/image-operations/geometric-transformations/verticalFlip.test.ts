import { expect, test, describe } from 'vitest';
import { Tensor } from '../../../src/tensor/types';
import { verticalFlip } from '../../../src/image-operations/geometric-transformation/verticalFlip';
import fc from 'fast-check';

describe('Vertical flip', () => {
  test('Vertical flip moves image downward', () => {
    const matrix: Tensor = [
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
    ];
    const transformedMatrix = verticalFlip(matrix);
    expect(transformedMatrix).toEqual([
      [3, 3, 3, 3],
      [2, 2, 2, 2],
      [1, 1, 1, 1],
    ]);
  });

  test('Vertical flip is its own inverse', () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }), {
          minLength: 10,
          maxLength: 10,
        }),
        matrix => {
          const doubleFlipped = verticalFlip(verticalFlip(matrix) as Array<Tensor>);
          expect(doubleFlipped).toEqual(matrix);
        },
      ),
    );
  });
});
