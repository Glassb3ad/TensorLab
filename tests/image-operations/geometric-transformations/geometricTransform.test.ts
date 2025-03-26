import { expect, test, describe } from 'vitest';
import { Coordinates, Tensor } from '../../../src/tensor/types';
import { geometricTransform } from '../../../src/image-operations/geometric-transformation/geometricTransform';

describe('geometricTransform', () => {
  test('Move vector values to right by one', () => {
    const vector: Tensor = [1, 2, 3, 4];
    const move = (coodinates: Coordinates) => [coodinates[0] + 1];
    const transformedVector = geometricTransform(vector, move);
    expect(transformedVector).toEqual([0, 1, 2, 3]);
  });

  test('Move matrix values to right by one', () => {
    const matrix: Tensor = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ];
    const move = (coodinates: Coordinates) => [coodinates[0], coodinates[1] + 1];
    const transformedMatrix = geometricTransform(matrix, move);
    expect(transformedMatrix).toEqual([
      [0, 1, 2, 3],
      [0, 5, 6, 7],
    ]);
  });
});
