import { isTensor } from '@/tensor/predicates/isTensor';
import fc from 'fast-check';
import { describe, test, expect } from 'vitest';

describe('isTensor', () => {
  test('Number is tensor', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 255 }), num => {
        expect(isTensor(num)).toBe(true);
      }),
    );
  });

  test('Array of numbers is tensors', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 1 }), vector => {
        expect(isTensor(vector)).toBe(true);
      }),
    );
  });

  test('Empty array is not tensor', () => {
    expect(isTensor([])).toBe(false);
  });

  test('Array of arrays of different lengths is not tensor', () => {
    const testMatrix = [[2], [2, 3]];
    expect(isTensor(testMatrix)).toBe(false);
  });

  test('Array of number and array is not tensor', () => {
    const testMatrix = [[2], 2];
    expect(isTensor(testMatrix)).toBe(false);
  });

  test('Array of arrays of equal length is tensors', () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }), { minLength: 1 }),
        matrix => {
          expect(isTensor(matrix)).toBe(true);
        },
      ),
    );
  });
});
