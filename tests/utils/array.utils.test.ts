import { isEmpty } from '@/utils/array.utils';
import fc from 'fast-check';
import { describe, test, expect } from 'vitest';

describe('isEmpty', () => {
  test('Returns false when array has members ', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 1 }), arr => {
        expect(isEmpty(arr)).toBe(false);
      }),
    );
  });

  test('Returns true when array is empty ', () => {
    expect(isEmpty([])).toBe(true);
  });
});
