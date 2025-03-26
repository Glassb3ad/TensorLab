import fc from 'fast-check';
import { describe, test, expect } from 'vitest';
import { createTensorByShape } from '@/tensor/generators/createTensorByShape';
import { Tensor } from '@tensor/types';

describe('createTensorByShape', () => {
  test('Return scalar when shape = []', () => {
    const shape = createTensorByShape([]);
    expect(shape).toBe(0);
  });

  test('Return vector with length L when shape = [L]', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 1, maxLength: 1 }), shape => {
        const vector = createTensorByShape(shape) as Array<Tensor>;
        expect(vector.length).toBe(shape[0]);
      }),
    );
  });

  test('Return matrix with M vectors of length L when shape = [M,L]', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 1, max: 255 }), { minLength: 2, maxLength: 2 }), shape => {
        const matrix = createTensorByShape(shape) as Array<Array<Tensor>>;
        expect(matrix.length).toBe(shape[0]);
        expect(matrix[0].length).toBe(shape[1]);
      }),
    );
  });
});
