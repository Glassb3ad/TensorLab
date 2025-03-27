import { getFirstScalar } from '@tensor/properties/getFirstScalar';
import fc from 'fast-check';
import { describe, test, expect } from 'vitest';

describe('getFirstScalar', () => {
  test('returns tensor itself when tensor is scalar', () => {
    fc.assert(
      fc.property(fc.integer(), scalar => {
        const first = getFirstScalar(scalar);
        expect(first).toBe(scalar);
      }),
    );
  });

  test('returns first scalar from a vector', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), { minLength: 1 }), vector => {
        const first = getFirstScalar(vector);
        expect(first).toBe(vector[0]);
      }),
    );
  });

  test('returns first scalar from a matrix', () => {
    fc.assert(
      fc.property(fc.array(fc.array(fc.integer(), { minLength: 10, maxLength: 10 }), { minLength: 1 }), matrix => {
        const first = getFirstScalar(matrix);
        expect(first).toBe(matrix[0][0]);
      }),
    );
  });

  test('returns first scalar from a matrix', () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.array(fc.integer(), { minLength: 10, maxLength: 10 }), { minLength: 10, maxLength: 10 }), {
          minLength: 1,
        }),
        tensor => {
          const first = getFirstScalar(tensor);
          expect(first).toBe(tensor[0][0][0]);
        },
      ),
    );
  });
});
