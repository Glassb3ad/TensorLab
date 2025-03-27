import fc from 'fast-check';
import { describe, test, expect } from 'vitest';
import { mapToZero } from '@tensor/operations/mapToZero';
import { Tensor } from '@tensor/types';

describe('mapToZero', () => {
  test('All scalars in vector are changed to zero', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 1 }), vector => {
        const zeroVector = mapToZero(vector) as Array<Tensor>;
        zeroVector.forEach(scalar => {
          expect(scalar).toBe(0);
        });
      }),
    );
  });

  test('All scalars in matrix are changed to zero', () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 5, maxLength: 5 }), { minLength: 1 }),
        matrix => {
          const zeroMatrix = mapToZero(matrix) as Array<Array<Tensor>>;
          zeroMatrix.forEach(vector => {
            vector.forEach(scalar => {
              expect(scalar).toBe(0);
            });
          });
        },
      ),
    );
  });
});
