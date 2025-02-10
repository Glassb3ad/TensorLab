import { expect, test, describe } from 'vitest';
import { Tensor } from '../src/tensor';

describe('Tensor constructor', () => {
  test('Create scalar', () => {
    const tensor = new Tensor(1);
    expect(tensor.tensor).toBe(1);
  });

  test('Create vector', () => {
    const tensor = new Tensor([1, 2, 3, 8]);
    expect(tensor.toArray()).toEqual([1, 2, 3, 8]);
  });
});
