import { expect, test, describe } from 'vitest';
import { treshold } from '../src/elementWiseOperations';

describe('Element-wise methods', () => {
  describe('Treshold', () => {
    test('Get 0 when treshold is 0.5 and scalar 0.2', () => {
      const tresholdFunc = treshold(0.5);
      const scalar = tresholdFunc(0.2);
      expect(scalar).toBe(0);
    });

    test('Get 1 when treshold is 0.5 and scalar 0.7', () => {
      const tresholdFunc = treshold(0.5);
      const scalar = tresholdFunc(0.7);
      expect(scalar).toBe(1);
    });

    test('Get aboveTreshold value when treshold is 0.5 and scalar 0.7', () => {
      const tresholdFunc = treshold(0.5, 0.99);
      const scalar = tresholdFunc(0.7);
      expect(scalar).toBe(0.99);
    });

    test('Get underTreshold value when scalar is under treshold', () => {
      const tresholdFunc = treshold(0.5, 0.99, 0.11);
      const scalar = tresholdFunc(0.2);
      expect(scalar).toBe(0.11);
    });
  });
});
