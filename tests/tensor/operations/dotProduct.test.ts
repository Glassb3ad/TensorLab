import { describe, expect, test } from 'vitest';
import { dotProduct } from '@tensor/operations/dotProduct';

describe('dot product', () => {
  test('if tensors have different dimensions throw error', () => {
    const t1 = [1, 2];
    const t2 = [1, 2, 3];
    expect(() => dotProduct(t1, t2)).toThrowError('tensors must have same dimensions');
  });

  test('dot product returns scalar', () => {
    const t1 = 2;
    const t2 = 4;
    const scalar = dotProduct(t1, t2);
    expect(scalar).toBeTypeOf('number');
  });

  test('dot product of scalars', () => {
    const t1 = 2;
    const t2 = 4;
    const scalar = dotProduct(t1, t2);
    expect(scalar).toBe(8);
  });

  test('dot product of vectors is sum of dot products of respective scalars', () => {
    const t1 = [2, 3];
    const t2 = [2, 2];
    const scalar = dotProduct(t1, t2);
    expect(scalar).toBe(10);
  });

  test('dot product of matrices is sum of dot products of respective vectors', () => {
    const t1 = [
      [1, 2],
      [3, 4],
    ];
    const t2 = [
      [2, 2],
      [2, 2],
    ];
    const scalar = dotProduct(t1, t2);
    expect(scalar).toBe(20);
  });
});
