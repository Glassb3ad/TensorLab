import { expect, test, describe } from 'vitest';
import { treshold } from '../../../src/image-operations/filters/treshold';

describe('Treshold', () => {
  test('Get 0 when treshold is 0.5 and scalar 0.2', () => {
    const scalar = treshold(0.2, 0.5);
    expect(scalar).toBe(0);
  });

  test('Get 1 when treshold is 0.5 and scalar 0.7', () => {
    const scalar = treshold(0.7, 0.5);
    expect(scalar).toBe(255);
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
    const tensor = [
      [1, 4],
      [3, 1],
    ];
    const newTensor = treshold(tensor, 2);
    expect(newTensor).toEqual([
      [0, 255],
      [255, 0],
    ]);
  });

  test('treshold matrix with custom values', () => {
    const tensor = [
      [1, 4],
      [3, 1],
    ];
    const newTensor = treshold(tensor, 2, 1.0, 0.1);
    expect(newTensor).toEqual([
      [0.1, 1.0],
      [1.0, 0.1],
    ]);
  });
});
