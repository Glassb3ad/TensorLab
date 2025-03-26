import { expect, test, describe } from 'vitest';
import { Tensor } from '../../../src/tensor/tensor';
import { horizontalFlip } from '../../../src/image-operations/geometric-transformation/horizontalFlip';
import fc from 'fast-check';

describe('Horizontal flip', () => {
  test('flip image sideward', () => {
    const matrix: Tensor = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ];
    const transformedMatrix = horizontalFlip(matrix);
    expect(transformedMatrix).toEqual([
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1],
    ]);
  });

  test('Horizontal flip is its own inverse', () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }), {
          minLength: 10,
          maxLength: 10,
        }),
        matrix => {
          const doubleFlipped = horizontalFlip(horizontalFlip(matrix) as Array<Tensor>);
          expect(doubleFlipped).toEqual(matrix);
        },
      ),
    );
  });
});
