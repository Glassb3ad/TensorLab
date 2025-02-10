import { expect, test, describe } from 'vitest';
import { Tensor } from '../src/tensor';

const scalar = 1;

describe('Tensor constructor', () => {
  test('Create scalar', () => {
    const tensor = new Tensor(scalar);
    expect(tensor.tensor).toBe(scalar);
  });
});
