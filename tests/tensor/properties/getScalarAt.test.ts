import { describe, test, expect } from 'vitest';
import { getScalarAt } from '../../../src/tensor/properties/getScalarAt';

describe('getScalarAt', () => {
  test('return tensor when tensor is scalar and coordinates are empty', () => {
    const tensor = getScalarAt(2, [], 0);
    expect(tensor).toBe(2);
  });

  test('return fallback when tensor is scalar and coordinates are not empty', () => {
    const tensor = getScalarAt(2, [2], 0);
    expect(tensor).toBe(0);
  });

  test('return scalar at given location in vector', () => {
    const tensor = getScalarAt([1, 2, 3], [1], 0);
    expect(tensor).toBe(2);
  });

  test('return fallback if given location is outside of vector', () => {
    const tensor = getScalarAt([1, 2, 3], [8], 0);
    expect(tensor).toBe(0);
  });

  test('return scalar at given location in matrix', () => {
    const tensor = getScalarAt(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [1, 0],
      0,
    );
    expect(tensor).toBe(4);
  });

  test('return fallback when location in matrix is not scalar', () => {
    const tensor = getScalarAt(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [1],
      0,
    );
    expect(tensor).toBe(0);
  });
});
