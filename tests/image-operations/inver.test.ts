import { expect, test, describe } from 'vitest';
import { Tensor } from '../../src/tensor';
import { invert } from '../../src/image-operations/invert';

describe('invert', () => {
  test('All scalars become max - scalar', () => {
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
});
