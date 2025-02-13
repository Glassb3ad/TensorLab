import { expect, test, describe } from 'vitest';
import { Tensor } from '../src/tensor';

describe('Tensor', () => {
  describe('Tensor from array', () => {
    test('Create scalar', () => {
      const tensor = Tensor.createTensorFromArray(1, []);
      expect(tensor.tensor).toBe(1);
    });

    test('Create vector', () => {
      const tensor = Tensor.createTensorFromArray([1, 2, 3, 8], [4]);
      expect(tensor.toArray()).toEqual([1, 2, 3, 8]);
    });

    test('Create matrix', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 8],
        ],
        [2, 2],
      );
      expect(tensor.toArray()).toEqual([
        [1, 2],
        [3, 8],
      ]);
    });

    test('Scalar has empty dimension', () => {
      const tensor = Tensor.createTensorFromArray(1, []);
      expect(tensor.dimensions).toEqual([]);
    });

    test('4 place vector has dimension [4]', () => {
      const tensor = Tensor.createTensorFromArray([1, 2, 3, 8], [4]);
      expect(tensor.dimensions).toEqual([4]);
    });

    test('Matrix with 2 2-place vectors has dimension [2,2]', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 8],
        ],
        [2, 2],
      );
      expect(tensor.dimensions).toEqual([2, 2]);
    });

    test('Vectors of [2,2] matrix have dimension [2]', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 8],
        ],
        [2, 2],
      );

      (tensor.tensor as Array<Tensor>).forEach(vector => {
        expect(vector.dimensions).toEqual([2]);
      });
    });

    test('Trying to create scalar with dimension [7] throws error', () => {
      expect(() => Tensor.createTensorFromArray(2, [7])).toThrowError('initial value violates given dimension');
    });

    test('Trying to create [5] vector with dimension [8] throws error', () => {
      expect(() => Tensor.createTensorFromArray([1, 2, 3, 4, 5], [8])).toThrowError(
        'initial value violates given dimension',
      );
    });

    test('Trying to create matrix with vectors of different lengths with dimension [2,2] throws error', () => {
      expect(() => Tensor.createTensorFromArray([[1, 2], [3]], [2, 2])).toThrowError(
        'initial value violates given dimension',
      );
    });
  });

  describe('Tensor from tensor', () => {
    test('Create scalar', () => {
      const tensor = Tensor.createTensorFromArray(1, []);
      const newTensor = Tensor.createTensorFromTensor(tensor, []);
      expect(newTensor.tensor).toBe(1);
    });

    test('Create vector', () => {
      const tensor = Tensor.createTensorFromArray([1, 2, 3, 8], [4]);
      const newTensor = Tensor.createTensorFromTensor(tensor, [4]);
      expect(newTensor.toArray()).toEqual([1, 2, 3, 8]);
    });

    test('Create matrix', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 8],
        ],
        [2, 2],
      );
      const newTensor = Tensor.createTensorFromTensor(tensor, [2, 2]);
      expect(newTensor.toArray()).toEqual([
        [1, 2],
        [3, 8],
      ]);
    });

    test('Scalar has empty dimension', () => {
      const tensor = Tensor.createTensorFromArray(1, []);
      const newTensor = Tensor.createTensorFromTensor(tensor, []);
      expect(newTensor.dimensions).toEqual([]);
    });

    test('4 place vector has dimension [4]', () => {
      const tensor = Tensor.createTensorFromArray([1, 2, 3, 8], [4]);
      const newTensor = Tensor.createTensorFromTensor(tensor, [4]);
      expect(newTensor.dimensions).toEqual([4]);
    });

    test('Matrix with 2 2-place vectors has dimension [2,2]', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 8],
        ],
        [2, 2],
      );
      const newTensor = Tensor.createTensorFromTensor(tensor, [2, 2]);
      expect(newTensor.dimensions).toEqual([2, 2]);
    });

    test('Vectors of [2,2] matrix have dimension [2]', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 8],
        ],
        [2, 2],
      );
      const newTensor = Tensor.createTensorFromTensor(tensor, [2, 2]);
      (newTensor.tensor as Array<Tensor>).forEach(vector => {
        expect(vector.dimensions).toEqual([2]);
      });
    });
  });

  describe('element-wise', () => {
    test('add 1 to scalar', () => {
      const tensor = Tensor.createTensorFromArray(1, []);
      const increasedByOne = Tensor.elementWise(tensor, a => a + 1);
      expect(increasedByOne.tensor).toBe(2);
    });

    test('add 1 to scalar does not mutate the original scalaer', () => {
      const tensor = Tensor.createTensorFromArray(1, []);
      Tensor.elementWise(tensor, a => a + 1);
      expect(tensor.tensor).toBe(1);
    });

    test('add 1 to vector', () => {
      const tensor = Tensor.createTensorFromArray([1, 2, 3, 4], [4]);
      const increasedByOne = Tensor.elementWise(tensor, a => a + 1);
      expect(increasedByOne.toArray()).toEqual([2, 3, 4, 5]);
    });

    test('add 1 to matrix', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 4],
        ],
        [2, 2],
      );
      const increasedByOne = Tensor.elementWise(tensor, a => a + 1);
      expect(increasedByOne.toArray()).toEqual([
        [2, 3],
        [4, 5],
      ]);
    });
  });

  describe('dot product', () => {
    test('if tensors have different dimensions throw error', () => {
      const t1 = Tensor.createTensorFromArray([1, 2], [2]);
      const t2 = Tensor.createTensorFromArray([1, 2, 3], [3]);
      expect(() => Tensor.dotProduct(t1, t2)).toThrowError('tensors must have same dimensions');
    });

    test('dot product returns scalar', () => {
      const t1 = Tensor.createTensorFromArray(2, []);
      const t2 = Tensor.createTensorFromArray(4, []);
      const scalar = Tensor.dotProduct(t1, t2);
      expect(scalar).toBeInstanceOf(Tensor);
      expect(scalar.dimensions).toEqual([]);
    });

    test('dot product of scalars', () => {
      const t1 = Tensor.createTensorFromArray(2, []);
      const t2 = Tensor.createTensorFromArray(4, []);
      const scalar = Tensor.dotProduct(t1, t2);
      expect(scalar.tensor).toBe(8);
    });

    test('dot product of vectors is sum of dot products of respective scalars', () => {
      const t1 = Tensor.createTensorFromArray([2, 3], [2]);
      const t2 = Tensor.createTensorFromArray([2, 2], [2]);
      const scalar = Tensor.dotProduct(t1, t2);
      expect(scalar.tensor).toBe(10);
    });

    test('dot product of matrices is sum of dot products of respective vectors', () => {
      const t1 = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 4],
        ],
        [2, 2],
      );
      const t2 = Tensor.createTensorFromArray(
        [
          [2, 2],
          [2, 2],
        ],
        [2, 2],
      );
      const scalar = Tensor.dotProduct(t1, t2);
      expect(scalar.tensor).toBe(20);
    });
  });

  describe('Tensor addition', () => {
    test('if tensors have different dimensions throw error', () => {
      const t1 = Tensor.createTensorFromArray([1, 2], [2]);
      const t2 = Tensor.createTensorFromArray([1, 2, 3], [3]);
      expect(() => Tensor.add(t1, t2)).toThrowError('tensors have unequal dimensions');
    });

    test('two scalars', () => {
      const t1 = Tensor.createTensorFromArray(2, []);
      const t2 = Tensor.createTensorFromArray(4, []);
      const scalar = Tensor.add(t1, t2);
      expect(scalar.tensor).toBe(6);
    });

    test('two vectors', () => {
      const t1 = Tensor.createTensorFromArray([2, 3], [2]);
      const t2 = Tensor.createTensorFromArray([2, 2], [2]);
      const scalar = Tensor.add(t1, t2);
      expect(scalar.toArray()).toEqual([4, 5]);
    });

    test('two matrices', () => {
      const t1 = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 4],
        ],
        [2, 2],
      );
      const t2 = Tensor.createTensorFromArray(
        [
          [2, 2],
          [2, 2],
        ],
        [2, 2],
      );
      const matrix = Tensor.add(t1, t2);
      expect(matrix.toArray()).toEqual([
        [3, 4],
        [5, 6],
      ]);
    });
  });

  describe('convolution', () => {
    test('convolution of two vectors with the same length', () => {
      const tensor = Tensor.createTensorFromArray([2, 3, 1], [3]);
      const kernel = Tensor.createTensorFromArray([1, 2, 3], [3]);
      const transformedTensor = Tensor.convolution(tensor, kernel);
      expect(transformedTensor.toArray()).toEqual([11]);
    });

    test('convolution of two vectors where kernel is shorter', () => {
      const tensor = Tensor.createTensorFromArray([2, 3, 1], [3]);
      const kernel = Tensor.createTensorFromArray([1, 2], [2]);
      const transformedTensor = Tensor.convolution(tensor, kernel);
      expect(transformedTensor.toArray()).toEqual([8, 5]);
    });

    test('convolution of 2x2 matrix with 1x2 matrix results in 2x1 matrix', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [3, 4],
        ],
        [2, 2],
      );
      const kernel = Tensor.createTensorFromArray([[2, 1]], [1, 2]);
      const transformedTensor = Tensor.convolution(tensor, kernel);
      expect(transformedTensor.toArray()).toEqual([[4], [10]]);
    });

    test('convolution of 2x2 matrix with 2x2 matrix results in 1x1 matrix', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2],
          [1, 2],
        ],
        [2, 2],
      );
      const kernel = Tensor.createTensorFromArray(
        [
          [2, 1],
          [1, 1],
        ],
        [2, 2],
      );
      const transformedTensor = Tensor.convolution(tensor, kernel);
      expect(transformedTensor.toArray()).toEqual([[7]]);
    });

    test('convolution of 2x3 matrix with 2x2 matrix results in 1x2 matrix', () => {
      const tensor = Tensor.createTensorFromArray(
        [
          [1, 2, 3],
          [1, 2, 3],
        ],
        [2, 3],
      );
      const kernel = Tensor.createTensorFromArray(
        [
          [2, 1],
          [1, 1],
        ],
        [2, 2],
      );
      const transformedTensor = Tensor.convolution(tensor, kernel);
      expect(transformedTensor.toArray()).toEqual([[7, 12]]);
    });
  });
});
