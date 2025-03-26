import { describe, expect, test } from 'vitest';
import { Tensor } from '../../../src/tensor/types';
import { min } from '../../../src/tensor/properties/min';

describe('min', () => {
  test('return argument itself when argument is scalar', () => {
    const scalar: Tensor = 1;
    const minValue = min(scalar);
    expect(minValue).toBe(scalar);
  });

  test('return min value from tensor', () => {
    const tensor: Tensor = [1, 8, 3, 4];
    const minValue = min(tensor);
    expect(minValue).toBe(1);
  });

  test('Returns zero when it is minimum value', () => {
    const tensor: Tensor = [1, 0, 8, 3, 4];
    const minValue = min(tensor);
    expect(minValue).toBe(0);
  });

  test('return min value from matrix', () => {
    const matrix: Tensor = [
      [12, 8, 3, 4],
      [15, 8, 2, 4],
      [24, 8, 13, 4],
    ];
    const minValue = min(matrix);
    expect(minValue).toBe(2);
  });
});
