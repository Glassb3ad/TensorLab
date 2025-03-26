import { expect, test, describe } from 'vitest';
import { Coordinates, Tensor } from '../../../src/tensor';
import { inverseGeometricTransform } from '../../../src/image-operations/geometric-transformation/inverseGeometricTransform';

describe('invertGeometricTransform', () => {
  test('Move vector values to right by one', () => {
    const vector: Tensor = [1, 2, 3, 4];
    const move = (coodinates: Coordinates) => [coodinates[0] - 1];
    const transformedVector = inverseGeometricTransform(vector, move, 0);
    expect(transformedVector).toEqual([0, 1, 2, 3]);
  });

  test('Move matrix values to right by one', () => {
    const matrix: Tensor = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ];
    const move = (coodinates: Coordinates) => [coodinates[0], coodinates[1] - 1];
    const transformedMatrix = inverseGeometricTransform(matrix, move, 0);
    expect(transformedMatrix).toEqual([
      [0, 1, 2, 3],
      [0, 5, 6, 7],
    ]);
  });
});
