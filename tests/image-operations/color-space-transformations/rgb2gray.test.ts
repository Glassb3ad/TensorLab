import { expect, test, describe } from 'vitest';
import { createTensorFromArray } from '../../../src/tensor/tensor';
import { rgb2gray } from '../../../src/image-operations/color-space-transformations/rgb2gray';
import { isMatrix } from '../../../src/tensor/shapePredicates';

const R = [[100]];
const G = [[150]];
const B = [[200]];
const RGB = createTensorFromArray([R, G, B]);

describe('rgb2gray', () => {
  test('if tensor is not 3d throw error', () => {
    const matrix = createTensorFromArray([[1, 2]]);
    expect(() => {
      rgb2gray(matrix);
    }).toThrowError('Tensor is not 3 dimensional');
  });

  test('rgb is transformed to matrix', () => {
    const grayscale = rgb2gray(RGB);
    expect(isMatrix(grayscale)).toBe(true);
  });

  test('rgb is transformed to grayscale', () => {
    const grayscale = rgb2gray(RGB);
    expect(grayscale).toEqual([[140.74]]);
  });
});
