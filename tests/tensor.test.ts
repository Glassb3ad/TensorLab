import { expect, test, describe } from 'vitest';
import { add, createTensorFromArray, dotProduct, equalShape, isMatrix, isScalar, isVector } from '../src/tensor';

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

  describe('dot product', () => {
    test('if tensors have different dimensions throw error', () => {
      const t1 = createTensorFromArray([1, 2]);
      const t2 = createTensorFromArray([1, 2, 3]);
      expect(() => dotProduct(t1, t2)).toThrowError('tensors must have same dimensions');
    });

    test('dot product returns scalar', () => {
      const t1 = createTensorFromArray(2);
      const t2 = createTensorFromArray(4);
      const scalar = dotProduct(t1, t2);
      // expect(scalar).toBeInstanceOf(Tensor2);
      expect(scalar).toBeTypeOf('number');
    });

    test('dot product of scalars', () => {
      const t1 = createTensorFromArray(2);
      const t2 = createTensorFromArray(4);
      const scalar = dotProduct(t1, t2);
      expect(scalar).toBe(8);
    });

    test('dot product of vectors is sum of dot products of respective scalars', () => {
      const t1 = createTensorFromArray([2, 3]);
      const t2 = createTensorFromArray([2, 2]);
      const scalar = dotProduct(t1, t2);
      expect(scalar).toBe(10);
    });

    test('dot product of matrices is sum of dot products of respective vectors', () => {
      const t1 = createTensorFromArray([
        [1, 2],
        [3, 4],
      ]);
      const t2 = createTensorFromArray([
        [2, 2],
        [2, 2],
      ]);
      const scalar = dotProduct(t1, t2);
      expect(scalar).toBe(20);
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

  describe('equalShape', () => {
    test('Two scalars have equal shape', () => {
      const t1 = createTensorFromArray(1);
      const t2 = createTensorFromArray(2);
      expect(equalShape(t1, t2)).toBe(true);
    });

    test('Scalars and matrix have different shape', () => {
      const t1 = createTensorFromArray(1);
      const t2 = createTensorFromArray([1, 2]);
      expect(equalShape(t1, t2)).toBe(false);
    });

    test('Matrices of different length have different shape', () => {
      const t1 = createTensorFromArray([1, 1, 1]);
      const t2 = createTensorFromArray([1, 2]);
      expect(equalShape(t1, t2)).toBe(false);
    });

    test('Vector and matrix have different shapes', () => {
      const t1 = createTensorFromArray([1, 2]);
      const t2 = createTensorFromArray([
        [1, 1],
        [1, 1],
      ]);
      expect(equalShape(t1, t2)).toBe(false);
    });
  });

  describe('isScalar', () => {
    test('return true when tensor is scalar', () => {
      const tensor = createTensorFromArray(1);
      expect(isScalar(tensor)).toBe(true);
    });

    test('return false when tensor is matrix', () => {
      const tensor = createTensorFromArray([1]);
      expect(isScalar(tensor)).toBe(false);
    });
  });

  describe('isVector', () => {
    test('return true when tensor is vector', () => {
      const tensor = createTensorFromArray([1]);
      expect(isVector(tensor)).toBe(true);
    });

    test('return false when tensor is matrix', () => {
      const tensor = createTensorFromArray([[1]]);
      expect(isVector(tensor)).toBe(false);
    });
  });

  describe('isMatrix', () => {
    test('return true when tensor is matrix', () => {
      const tensor = createTensorFromArray([[1], [2]]);
      expect(isMatrix(tensor)).toBe(true);
    });

    test('return false when tensor is vector', () => {
      const tensor = createTensorFromArray([1]);
      expect(isMatrix(tensor)).toBe(false);
    });
  });
});
