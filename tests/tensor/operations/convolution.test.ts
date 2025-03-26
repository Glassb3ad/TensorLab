import { expect, test, describe } from 'vitest';
import { convolution, sliceTensorByKernel } from '../../../src/tensor/operations/convolution';

describe('convolution', () => {
  describe('sliceTensorByKernel', () => {
    test('if tensor is scalar throw error', () => {
      const t1 = 1;
      const kernel = [1, 2];
      expect(() => {
        sliceTensorByKernel(t1, kernel);
      }).toThrowError('Scalar cannot be sliced');
    });

    test('2 place vector has 1 slice with size 2', () => {
      const t1 = [1, 1];
      const kernel = [1, 2];
      const slices = sliceTensorByKernel(t1, kernel);
      expect(slices.length).toBe(1);
      expect(slices[0]).toEqual([1, 1]);
    });

    test('3 place vector has 2 slice with size 2', () => {
      const t1 = [1, 2, 3];
      const kernel = [1, 2];
      const slices = sliceTensorByKernel(t1, kernel);
      expect(slices.length).toBe(2);
      expect(slices).toEqual([
        [1, 2],
        [2, 3],
      ]);
    });
  });

  test('convolution of scalars throw error', () => {
    const tensor = 2;
    const kernel = 1;
    expect(() => convolution(tensor, kernel)).toThrowError('Convolution does not support scalars');
  });

  test('convolution of two vectors with the same length', () => {
    const tensor = [2, 3, 1];
    const kernel = [1, 2, 3];
    const transformedTensor = convolution(tensor, kernel);
    expect(transformedTensor).toEqual([11]);
  });

  test('convolution of two vectors where kernel is shorter', () => {
    const tensor = [2, 3, 1];
    const kernel = [1, 2];
    const transformedTensor = convolution(tensor, kernel);
    expect(transformedTensor).toEqual([8, 5]);
  });

  test('convolution of 2x2 matrix with 1x2 matrix results in 2x1 matrix', () => {
    const tensor = [
      [1, 2],
      [3, 4],
    ];
    const kernel = [[2, 1]];
    const transformedTensor = convolution(tensor, kernel);
    expect(transformedTensor).toEqual([[4], [10]]);
  });

  test('convolution of 2x2 matrix with 2x2 matrix results in 1x1 matrix', () => {
    const tensor = [
      [1, 2],
      [1, 2],
    ];
    const kernel = [
      [2, 1],
      [1, 1],
    ];
    const transformedTensor = convolution(tensor, kernel);
    expect(transformedTensor).toEqual([[7]]);
  });

  test('convolution of 2x3 matrix with 2x2 matrix results in 1x2 matrix', () => {
    const tensor = [
      [1, 2, 3],
      [1, 2, 3],
    ];
    const kernel = [
      [2, 1],
      [1, 1],
    ];
    const transformedTensor = convolution(tensor, kernel);
    expect(transformedTensor).toEqual([[7, 12]]);
  });

  test('convolution of 3x3 matrix with 2x2 matrix results in 2x2 matrix', () => {
    const tensor = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 1, 1],
    ];
    const kernel = [
      [2, 1],
      [1, 1],
    ];
    const transformedTensor = convolution(tensor, kernel);
    expect(transformedTensor).toEqual([
      [7, 12],
      [6, 9],
    ]);
  });

  test('1x convolution of 3x3x3 matrix results in 3x3x3 matrix', () => {
    const tensor = [
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
    ];
    const kernel = [[[2]], [[2]], [[2]]];
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
