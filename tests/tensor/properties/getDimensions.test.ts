import fc from 'fast-check';
import { describe, test, expect } from 'vitest';
import { getDimensions } from '../../../src/tensor/properties/getDimensions';

describe('getDimensions', () => {
  test('Scalar has dimension []', () => {
    const dimensions = getDimensions(1);
    expect(dimensions).toEqual([]);
  });

  test('Vector has dimension [vector.length]', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 })), vector => {
        const dimension = getDimensions(vector);
        expect(dimension).toEqual([vector.length]);
      }),
    );
  });

  test('Matrix has dimension [matrix.length, vector.length]', () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }), { minLength: 1 }),
        matrix => {
          const dimension = getDimensions(matrix);
          expect(dimension).toEqual([matrix.length, matrix[0].length]);
        },
      ),
    );
  });
});
