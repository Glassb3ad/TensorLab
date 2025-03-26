import { describe, test, expect } from 'vitest';
import { add } from '../src/tensor/add';
import { createTensorFromArray } from '../src/tensor/tensor';

describe('Tensor addition', () => {
  test('if tensors have different dimensions throw error', () => {
    const t1 = createTensorFromArray([1, 2]);
    const t2 = createTensorFromArray([1, 2, 3]);
    expect(() => add(t1, t2)).toThrowError('tensors have unequal dimensions');
  });

  test('two scalars', () => {
    const t1 = createTensorFromArray(2);
    const t2 = createTensorFromArray(4);
    const scalar = add(t1, t2);
    expect(scalar).toBe(6);
  });

  test('two vectors', () => {
    const t1 = createTensorFromArray([2, 3]);
    const t2 = createTensorFromArray([2, 2]);
    const vector = add(t1, t2);
    expect(vector).toEqual([4, 5]);
  });

  test('two matrices', () => {
    const t1 = createTensorFromArray([
      [1, 2],
      [3, 4],
    ]);
    const t2 = createTensorFromArray([
      [2, 2],
      [2, 2],
    ]);
    const matrix = add(t1, t2);
    expect(matrix).toEqual([
      [3, 4],
      [5, 6],
    ]);
  });
});
