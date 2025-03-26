import { describe, test, expect } from 'vitest';
import { max } from '../../../src/tensor/properties/max';
import { Tensor } from '../../../src/tensor/types';

describe('max', () => {
  test('return argument itself when argument is scalar', () => {
    const scalar: Tensor = 1;
    const maxValue = max(scalar);
    expect(maxValue).toBe(scalar);
  });

  test('return max value from tensor', () => {
    const tensor: Tensor = [1, 8, 3, 4];
    const maxValue = max(tensor);
    expect(maxValue).toBe(8);
  });

  test('Max value can be zero', () => {
    const tensor: Tensor = [0, 0, 0, 0];
    const maxValue = max(tensor);
    expect(maxValue).toBe(0);
  });

  test('return max value from matrix', () => {
    const matrix: Tensor = [
      [1, 8, 3, 4],
      [1, 8, 20, 4],
      [1, 8, 13, 4],
    ];
    const maxValue = max(matrix);
    expect(maxValue).toBe(20);
  });
});
