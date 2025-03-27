import { Scalar } from '@tensor/types';
import { combine } from '@tensor/operations/combine';
import { describe, test, expect, vi } from 'vitest';

const mockFunc = vi.fn((t1: Scalar, t2: Scalar) => t1 + t2);

describe('Combine', () => {
  test('if tensors have different shapes throw error', () => {
    const t1 = [1, 2];
    const t2 = [1, 2, 3];
    expect(() => combine(t1, t2, mockFunc)).toThrowError('tensors have different shapes');
  });

  test('add two scalars', () => {
    const t1 = 2;
    const t2 = 4;
    const scalar = combine(t1, t2, mockFunc);
    expect(scalar).toBe(6);
    expect(mockFunc).toBeCalled();
  });

  test('add two vectors', () => {
    const t1 = [2, 3];
    const t2 = [2, 2];
    const vector = combine(t1, t2, mockFunc);
    expect(vector).toEqual([4, 5]);
    expect(mockFunc).toBeCalled();
  });
});
