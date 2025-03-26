import { expect, test, describe } from 'vitest';
import { Coordinates, Tensor } from '../../src/tensor/types';
import { fold } from '../../src/tensor/fold';

describe('recursive operations', () => {
  test('base case: add 1 to scalar', () => {
    const scalar: Tensor = 1;
    const increasedByOne = fold<number>(scalar, (agg, cur) => agg + cur, 1);
    expect(increasedByOne).toBe(2);
  });

  test('sum vector values', () => {
    const vector: Tensor = [1, 2, 3, 4];
    const sum = fold<number>(vector, (agg, cur) => agg + cur, 0);
    expect(sum).toBe(10);
  });

  test('transform matrix to vector', () => {
    const matrix: Tensor = [
      [1, 2],
      [3, 4],
    ];
    const vector = fold<Array<number>>(matrix, (agg, cur) => [...agg, cur], []);
    expect(vector).toEqual([1, 2, 3, 4]);
  });

  test('transform 3D tensor to vector', () => {
    const matrix: Tensor = [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ];
    const vector = fold<Array<number>>(matrix, (agg, cur) => [...agg, cur], []);
    expect(vector).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test('Replace vector values with their coordinates', () => {
    const vector: Tensor = [1, 2, 3, 4];
    const coordinateVector = fold<Array<Coordinates>>(vector, (agg, _cur, coordinates) => agg.concat(coordinates), []);
    expect(coordinateVector).toEqual([0, 1, 2, 3]);
  });

  test('Replace matrix values with coordinates', () => {
    const matrix: Tensor = [
      [1, 2],
      [3, 4],
    ];
    const coordinateMatrix = fold<Array<Array<Coordinates>>>(
      matrix,
      (agg, _cur, coordinates) => {
        const [row] = coordinates;
        if (agg[row]) {
          agg[row] = [...agg[row], coordinates];
          return agg;
        } else {
          return [...agg, [coordinates]];
        }
      },
      [[]],
    );
    expect(coordinateMatrix).toEqual([
      [
        [0, 0],
        [0, 1],
      ],
      [
        [1, 0],
        [1, 1],
      ],
    ]);
  });
});
