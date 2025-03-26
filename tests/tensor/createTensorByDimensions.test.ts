import fc from 'fast-check';
import { describe, test, expect } from 'vitest';
import { createTensorByDimensions } from '../../src/tensor/createTensorByDimensions';
import { Tensor } from '../../src/tensor/types';

describe('createTensorByDimensions', () => {
  test('Return scalar when dimension = []', () => {
    const dimensions = createTensorByDimensions([]);
    expect(dimensions).toBe(0);
  });

  test('Return vector with length L when dimension = [L]', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 1, maxLength: 1 }), dimensions => {
        const vector = createTensorByDimensions(dimensions) as Array<Tensor>;
        expect(vector.length).toBe(dimensions[0]);
      }),
    );
  });

  test('Return matrix with M vectors of length L when dimension = [M,L]', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 1, max: 255 }), { minLength: 2, maxLength: 2 }), dimensions => {
        const matrix = createTensorByDimensions(dimensions) as Array<Array<Tensor>>;
        expect(matrix.length).toBe(dimensions[0]);
        expect(matrix[0].length).toBe(dimensions[1]);
      }),
    );
  });
});
