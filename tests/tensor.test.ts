import { expect, test, describe } from 'vitest';
import { add, createTensorByDimensions, createTensorFromArray, getDimensions } from '../src/tensor/tensor';
import fc from 'fast-check';
import { Tensor } from '../src/tensor/types';

describe('Tensor', () => {
  describe('Tenso from array', () => {
    test('Create scalar', () => {
      const tensor = createTensorFromArray(1);
      expect(tensor).toBe(1);
    });

    test('Create vector', () => {
      const tensor = createTensorFromArray([1, 2, 3, 8]);
      expect(tensor).toEqual([1, 2, 3, 8]);
    });

    test('Create matrix', () => {
      const tensor = createTensorFromArray([
        [1, 2],
        [3, 8],
      ]);
      expect(tensor).toEqual([
        [1, 2],
        [3, 8],
      ]);
    });

    test('Scalar is number', () => {
      const tensor = createTensorFromArray(1);
      expect(tensor).toBeTypeOf('number');
    });

    test.skip('Trying to create matrix with vectors of different lengths throws error', () => {
      expect(() => createTensorFromArray([[1, 2], [3]])).toThrowError('Sub tensors have unequal length');
    });
  });

  describe('Tensor addition', () => {
    test('if tensors have different dimensions throw error', () => {
      const t1 = createTensorFromArray([1, 2]);
      const t2 = createTensorFromArray([1, 2, 3]);
      expect(() => add(t1, t2)).toThrowError('tensors have unequal dimensions');
    });

    test('two scalars', () => {
      const t1 = createTensorFromArray(2);
      const t2 = createTensorFromArray(4);
      const scalar = add(t1, t2);
      expect(scalar).toBe(6);
    });

    test('two vectors', () => {
      const t1 = createTensorFromArray([2, 3]);
      const t2 = createTensorFromArray([2, 2]);
      const vector = add(t1, t2);
      expect(vector).toEqual([4, 5]);
    });

    test('two matrices', () => {
      const t1 = createTensorFromArray([
        [1, 2],
        [3, 4],
      ]);
      const t2 = createTensorFromArray([
        [2, 2],
        [2, 2],
      ]);
      const matrix = add(t1, t2);
      expect(matrix).toEqual([
        [3, 4],
        [5, 6],
      ]);
    });
  });

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
});
