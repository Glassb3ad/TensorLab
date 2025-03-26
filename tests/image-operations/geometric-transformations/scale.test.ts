import { expect, test, describe } from 'vitest';
import { Tensor } from '../../../src/tensor/types';
import { scale } from '../../../src/image-operations/geometric-transformation/scale';

describe('scale', () => {
  test('scale 2x vertically ', () => {
    const matrix: Tensor = [
      [1, 2],
      [3, 4],
    ];
    const transformedMatrix = scale(matrix, 1, 2);
    expect(transformedMatrix).toEqual([
      [1, 2],
      [3, 4],
      [3, 4],
    ]);
  });

  test('scale 2x horizontally', () => {
    const matrix: Tensor = [
      [1, 2],
      [3, 4],
    ];
    const transformedMatrix = scale(matrix, 2, 1);
    expect(transformedMatrix).toEqual([
      [1, 2, 2],
      [3, 4, 4],
    ]);
  });

  test('scale 2x', () => {
    const matrix: Tensor = [
      [1, 2],
      [3, 4],
    ];
    const transformedMatrix = scale(matrix, 2, 2);
    expect(transformedMatrix).toEqual([
      [1, 2, 2],
      [3, 4, 4],
      [3, 4, 4],
    ]);
  });
});
