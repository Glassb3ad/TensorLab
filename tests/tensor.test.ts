import { expect, test, describe } from 'vitest';
import {
  add,
  convolution,
  createTensorFromArray,
  dotProduct,
  elementWise,
  equalShape,
  isScalar,
  isVector,
  sliceTensorByKernel,
} from '../src/tensor';

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

  describe('element-wise', () => {
    test('add 1 to scalar', () => {
      const tensor = createTensorFromArray(1);
      const increasedByOne = elementWise(tensor, a => a + 1);
      expect(increasedByOne).toBe(2);
    });

    test('add 1 to scalar does not mutate the original scalaer', () => {
      const tensor = createTensorFromArray(1);
      elementWise(tensor, a => a + 1);
      expect(tensor).toBe(1);
    });

    test('add 1 to vector', () => {
      const tensor = createTensorFromArray([1, 2, 3, 4]);
      const increasedByOne = elementWise(tensor, a => a + 1);
      expect(increasedByOne).toEqual([2, 3, 4, 5]);
    });

    test('add 1 to matrix', () => {
      const tensor = createTensorFromArray([
        [1, 2],
        [3, 4],
      ]);
      const increasedByOne = elementWise(tensor, a => a + 1);
      expect(increasedByOne).toEqual([
        [2, 3],
        [4, 5],
      ]);
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

  describe('convolution', () => {
    describe('sliceTensorByKernel', () => {
      test('if tensor is scalar throw error', () => {
        const t1 = createTensorFromArray(1);
        const kernel = createTensorFromArray([1, 2]);
        expect(() => {
          sliceTensorByKernel(t1, kernel);
        }).toThrowError('Scalar cannot be sliced');
      });

      test('2 place vector has 1 slice with size 2', () => {
        const t1 = createTensorFromArray([1, 1]);
        const kernel = createTensorFromArray([1, 2]);
        const slices = sliceTensorByKernel(t1, kernel);
        expect(slices.length).toBe(1);
        expect(slices[0]).toEqual([1, 1]);
      });

      test('3 place vector has 2 slice with size 2', () => {
        const t1 = createTensorFromArray([1, 2, 3]);
        const kernel = createTensorFromArray([1, 2]);
        const slices = sliceTensorByKernel(t1, kernel);
        expect(slices.length).toBe(2);
        expect(slices).toEqual([
          [1, 2],
          [2, 3],
        ]);
      });
    });

    test('convolution of scalars throw error', () => {
      const tensor = createTensorFromArray(2);
      const kernel = createTensorFromArray(1);
      expect(() => convolution(tensor, kernel)).toThrowError('Convolution does not support scalars');
    });

    test('convolution of two vectors with the same length', () => {
      const tensor = createTensorFromArray([2, 3, 1]);
      const kernel = createTensorFromArray([1, 2, 3]);
      const transformedTensor = convolution(tensor, kernel);
      expect(transformedTensor).toEqual([11]);
    });

    test('convolution of two vectors where kernel is shorter', () => {
      const tensor = createTensorFromArray([2, 3, 1]);
      const kernel = createTensorFromArray([1, 2]);
      const transformedTensor = convolution(tensor, kernel);
      expect(transformedTensor).toEqual([8, 5]);
    });

    test('convolution of 2x2 matrix with 1x2 matrix results in 2x1 matrix', () => {
      const tensor = createTensorFromArray([
        [1, 2],
        [3, 4],
      ]);
      const kernel = createTensorFromArray([[2, 1]]);
      const transformedTensor = convolution(tensor, kernel);
      expect(transformedTensor).toEqual([[4], [10]]);
    });

    test('convolution of 2x2 matrix with 2x2 matrix results in 1x1 matrix', () => {
      const tensor = createTensorFromArray([
        [1, 2],
        [1, 2],
      ]);
      const kernel = createTensorFromArray([
        [2, 1],
        [1, 1],
      ]);
      const transformedTensor = convolution(tensor, kernel);
      expect(transformedTensor).toEqual([[7]]);
    });

    test('convolution of 2x3 matrix with 2x2 matrix results in 1x2 matrix', () => {
      const tensor = createTensorFromArray([
        [1, 2, 3],
        [1, 2, 3],
      ]);
      const kernel = createTensorFromArray([
        [2, 1],
        [1, 1],
      ]);
      const transformedTensor = convolution(tensor, kernel);
      expect(transformedTensor).toEqual([[7, 12]]);
    });

    test('convolution of 3x3 matrix with 2x2 matrix results in 2x2 matrix', () => {
      const tensor = createTensorFromArray([
        [1, 2, 3],
        [1, 2, 3],
        [1, 1, 1],
      ]);
      const kernel = createTensorFromArray([
        [2, 1],
        [1, 1],
      ]);
      const transformedTensor = convolution(tensor, kernel);
      expect(transformedTensor).toEqual([
        [7, 12],
        [6, 9],
      ]);
    });

    test('1x convolution of 3x3x3 matrix results in 3x3x3 matrix', () => {
      const tensor = createTensorFromArray([
        [
          [1, 2, 3],
          [1, 2, 3],
          [1, 1, 1],
        ],
        [
          [1, 2, 3],
          [1, 2, 3],
          [1, 1, 1],
        ],
        [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ],
      ]);
      const kernel = createTensorFromArray([[[2]], [[2]], [[2]]]);
      const transformedTensor = convolution(tensor, kernel);
      expect(transformedTensor).toEqual([
        [
          [6, 10, 14],
          [6, 10, 14],
          [6, 6, 6],
        ],
      ]);
    });
  });
});
