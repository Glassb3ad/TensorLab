import { expect, test, describe } from 'vitest';
import { Tensor } from '../src/tensor';

describe('Tensor constructor', () => {
  test('Create scalar', () => {
    const tensor = new Tensor(1, []);
    expect(tensor.tensor).toBe(1);
  });

  test('Create vector', () => {
    const tensor = new Tensor([1, 2, 3, 8], [4]);
    expect(tensor.toArray()).toEqual([1, 2, 3, 8]);
  });

  test('Create matrix', () => {
    const tensor = new Tensor(
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
    const tensor = new Tensor(1, []);
    expect(tensor.dimensions).toBe(undefined);
  });

  test('4 place vector has dimension [4]', () => {
    const tensor = new Tensor([1, 2, 3, 8], [4]);
    expect(tensor.dimensions).toEqual([4]);
  });

  test('Matrix with 2 2-place vectirs has dimension [2,2]', () => {
    const tensor = new Tensor(
      [
        [1, 2],
        [3, 8],
      ],
      [2, 2],
    );
    expect(tensor.dimensions).toEqual([2, 2]);
  });
});
