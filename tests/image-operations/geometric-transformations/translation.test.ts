import { expect, test, describe } from 'vitest';
import { Tensor } from '../../../src/tensor/types';
import { translate } from '../../../src/image-operations/geometric-transformation/translation';

describe('translation', () => {
  test('move one right-down', () => {
    const matrix: Tensor = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const transformedMatrix = translate(matrix, 1, 1);
    expect(transformedMatrix).toEqual([
      [0, 0],
      [0, 1],
      [0, 3],
    ]);
  });

  test('move one left-up', () => {
    const matrix: Tensor = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const transformedMatrix = translate(matrix, -1, -1);
    expect(transformedMatrix).toEqual([
      [4, 0],
      [6, 0],
      [0, 0],
    ]);
  });
});
