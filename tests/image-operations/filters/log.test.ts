import { expect, test, describe } from 'vitest';
import { Tensor } from '@tensor/types';
import { log } from '@image/filters/log';

describe('invert', () => {
  test('255 scalar should remain as 255', () => {
    const vector: Tensor = [255];
    const logTransformed = log(vector);
    expect(logTransformed).toEqual([255]);
  });

  test('Log transformation returns expected values where increases reflects logarithmic behavior', () => {
    const vector: Tensor = [0, 10, 50, 100, 150, 200, 255];
    const expectedVector = [0, 110, 181, 212, 231, 244, 255];
    const logTransformed = log(vector) as Array<Tensor>;
    logTransformed.forEach((scalar, i) => {
      expect(scalar).toBeCloseTo(expectedVector[i], 0);
    });
  });
});
