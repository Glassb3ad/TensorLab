import { expect, test, describe } from 'vitest';
import { adjustBrightness } from '../../src/image-operations/adjustBrightness';
import { Tensor } from '../../src/tensor/types';

describe('adjustBrightness', () => {
  test('All scalars are multiplied with 2', () => {
    const matrix: Tensor = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ];
    const brighterMatrix = adjustBrightness(matrix, 2);
    expect(brighterMatrix).toEqual([
      [2, 4, 6, 8],
      [2, 4, 6, 8],
      [2, 4, 6, 8],
    ]);
  });

  test('Scalars do not exceed max limit', () => {
    const matrix: Tensor = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ];
    const brighterMatrix = adjustBrightness(matrix, 2, 6);
    expect(brighterMatrix).toEqual([
      [2, 4, 6, 6],
      [2, 4, 6, 6],
      [2, 4, 6, 6],
    ]);
  });

  test('Scalars do not fall below min limit', () => {
    const matrix: Tensor = [
      [2, 3, 5, 4],
      [2, 3, 5, 4],
      [2, 3, 5, 4],
    ];
    const brighterMatrix = adjustBrightness(matrix, 0.5, 6, 1.5);
    expect(brighterMatrix).toEqual([
      [1.5, 1.5, 2.5, 2],
      [1.5, 1.5, 2.5, 2],
      [1.5, 1.5, 2.5, 2],
    ]);
  });
});
