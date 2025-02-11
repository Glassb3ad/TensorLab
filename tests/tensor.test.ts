import { expect, test, describe } from 'vitest';
import { Tensor } from '../src/tensor';

describe('Tensor constructor', () => {
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

  test('Scalar has dimensions undefined', () => {
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

describe('Test element-wise method', () => {
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
});
