import fc from 'fast-check';
import { describe, test, expect } from 'vitest';
import { getShape } from '@/tensor/properties/getShape';

describe('getShape', () => {
  test('Scalar has shape []', () => {
    const shape = getShape(1);
    expect(shape).toEqual([]);
  });

  test('Vector has shape [vector.length]', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 })), vector => {
        const shape = getShape(vector);
        expect(shape).toEqual([vector.length]);
      }),
    );
  });

  test('Matrix has shape [matrix.length, vector.length]', () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }), { minLength: 1 }),
        matrix => {
          const shape = getShape(matrix);
          expect(shape).toEqual([matrix.length, matrix[0].length]);
        },
      ),
    );
  });
});
