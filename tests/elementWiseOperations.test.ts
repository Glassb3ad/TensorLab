import { expect, test, describe } from 'vitest';
import { createTresholdOperation, treshold } from '../src/elementWiseOperations';
import { createTensorFromArray } from '../src/tensor';

describe('Element-wise methods', () => {
  describe('Treshold', () => {
    describe('treshold operation', () => {
      test('Get 0 when treshold is 0.5 and scalar 0.2', () => {
        const tresholdOperation = createTresholdOperation(0.5);
        const scalar = tresholdOperation(0.2);
        expect(scalar).toBe(0);
      });

      test('Get 1 when treshold is 0.5 and scalar 0.7', () => {
        const tresholdOperation = createTresholdOperation(0.5);
        const scalar = tresholdOperation(0.7);
        expect(scalar).toBe(1);
      });

      test('Get aboveTreshold value when treshold is 0.5 and scalar 0.7', () => {
        const tresholdOperation = createTresholdOperation(0.5, 0.99);
        const scalar = tresholdOperation(0.7);
        expect(scalar).toBe(0.99);
      });

      test('Get underTreshold value when scalar is under treshold', () => {
        const tresholdOperation = createTresholdOperation(0.5, 0.99, 0.11);
        const scalar = tresholdOperation(0.2);
        expect(scalar).toBe(0.11);
      });
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
});
