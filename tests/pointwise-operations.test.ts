import { expect, test, describe } from 'vitest';
import { createTensorFromArray } from '../src/tensor/tensor';
import fc from 'fast-check';
import { mapToZero, pointwise, treshold } from '../src/tensor/pointwise-operations';
import { Tensor } from '../src/tensor/types';

describe('point-wise', () => {
  test('add 1 to scalar', () => {
    const tensor = createTensorFromArray(1);
    const increasedByOne = pointwise(tensor, a => a + 1);
    expect(increasedByOne).toBe(2);
  });

  test('add 1 to scalar does not mutate the original scalaer', () => {
    const tensor = createTensorFromArray(1);
    pointwise(tensor, a => a + 1);
    expect(tensor).toBe(1);
  });

  test('add 1 to vector', () => {
    const tensor = createTensorFromArray([1, 2, 3, 4]);
    const increasedByOne = pointwise(tensor, a => a + 1);
    expect(increasedByOne).toEqual([2, 3, 4, 5]);
  });

  test('add 1 to matrix', () => {
    const tensor = createTensorFromArray([
      [1, 2],
      [3, 4],
    ]);
    const increasedByOne = pointwise(tensor, a => a + 1);
    expect(increasedByOne).toEqual([
      [2, 3],
      [4, 5],
    ]);
  });

  describe('Treshold', () => {
    test('Get 0 when treshold is 0.5 and scalar 0.2', () => {
      const scalar = treshold(0.2, 0.5);
      expect(scalar).toBe(0);
    });

    test('Get 1 when treshold is 0.5 and scalar 0.7', () => {
      const scalar = treshold(0.7, 0.5);
      expect(scalar).toBe(1);
    });

    test('Get aboveTreshold value when treshold is 0.5 and scalar 0.7', () => {
      const scalar = treshold(0.7, 0.5, 0.99);
      expect(scalar).toBe(0.99);
    });

    test('Get underTreshold value when scalar is under treshold', () => {
      const scalar = treshold(0.2, 0.5, 0.99, 0.11);
      expect(scalar).toBe(0.11);
    });

    test('treshold matrix', () => {
      const tensor = createTensorFromArray([
        [1, 4],
        [3, 1],
      ]);
      const newTensor = treshold(tensor, 2);
      expect(newTensor).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });

    test('treshold matrix with custom values', () => {
      const tensor = createTensorFromArray([
        [1, 4],
        [3, 1],
      ]);
      const newTensor = treshold(tensor, 2, 1.0, 0.1);
      expect(newTensor).toEqual([
        [0.1, 1.0],
        [1.0, 0.1],
      ]);
    });
  });

  describe('mapToZero', () => {
    test('All scalars in vector are changed to zero', () => {
      fc.assert(
        fc.property(fc.array(fc.integer({ min: 0, max: 255 })), vector => {
          const zeroVector = mapToZero(vector) as Array<Tensor>;
          zeroVector.forEach(scalar => {
            expect(scalar).toBe(0);
          });
        }),
      );
    });

    test('All scalars in matrix are changed to zero', () => {
      fc.assert(
        fc.property(fc.array(fc.array(fc.integer({ min: 0, max: 255 }))), matrix => {
          const zeroMatrix = mapToZero(matrix) as Array<Array<Tensor>>;
          zeroMatrix.forEach(vector => {
            vector.forEach(scalar => {
              expect(scalar).toBe(0);
            });
          });
        }),
      );
    });
  });
});
