import { expect, test, describe } from 'vitest';
import { pointwise } from '@tensor/operations/pointwise';

describe('point-wise', () => {
  test('add 1 to scalar', () => {
    const tensor = 1;
    const increasedByOne = pointwise(tensor, a => a + 1);
    expect(increasedByOne).toBe(2);
  });

  test('adding 1 to scalar does not mutate the original scalar', () => {
    const tensor = 1;
    pointwise(tensor, a => a + 1);
    expect(tensor).toBe(1);
  });

  test('add 1 to vector', () => {
    const tensor = [1, 2, 3, 4];
    const increasedByOne = pointwise(tensor, a => a + 1);
    expect(increasedByOne).toEqual([2, 3, 4, 5]);
  });

  test('add 1 to matrix', () => {
    const tensor = [
      [1, 2],
      [3, 4],
    ];
    const increasedByOne = pointwise(tensor, a => a + 1);
    expect(increasedByOne).toEqual([
      [2, 3],
      [4, 5],
    ]);
  });
});
