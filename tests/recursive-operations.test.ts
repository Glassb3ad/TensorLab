import { expect, test, describe } from 'vitest';
import { Tensor } from '../src/tensor';
import { fold, max, min } from '../src/recursive-operations';

describe('recursive operations', () => {
  test('base case: add 1 to scalar', () => {
    const scalar: Tensor = 1;
    const increasedByOne = fold<number>(scalar, (agg, cur) => agg + cur, 1);
    expect(increasedByOne).toBe(2);
  });

  test('sum vector values', () => {
    const vector: Tensor = [1, 2, 3, 4];
    const sum = fold<number>(vector, (agg, cur) => agg + cur, 0);
    expect(sum).toBe(10);
  });

  test('transform matrix to vector', () => {
    const matrix: Tensor = [
      [1, 2],
      [3, 4],
    ];
    const vector = fold<Array<number>>(matrix, (agg, cur) => [...agg, cur], []);
    expect(vector).toEqual([1, 2, 3, 4]);
  });

  test('transform 3D tensor to vector', () => {
    const matrix: Tensor = [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ];
    const vector = fold<Array<number>>(matrix, (agg, cur) => [...agg, cur], []);
    expect(vector).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

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
