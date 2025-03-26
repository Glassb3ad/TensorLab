import { expect, test, describe } from 'vitest';
import { Coordinates, Tensor } from '../src/tensor/types';
import { fold, map } from '../src/tensor/recursive-operations';
import fc from 'fast-check';

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

describe('map', () => {
  test('Preserve vector dimensionality', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 })), vector => {
        const mappedVector = map(vector, a => a);
        expect(mappedVector).toEqual(vector);
      }),
    );
  });

  test('Preserve matrix dimensionality', () => {
    fc.assert(
      fc.property(fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { maxLength: 10, minLength: 10 })), matrix => {
        const mappedMatrix = map(matrix, a => a) as Array<Array<Tensor>>;
        expect(mappedMatrix).toEqual(matrix);
      }),
    );
  });

  test('Preserve 3d tensor dimensionality', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { maxLength: 10, minLength: 10 }), {
            maxLength: 10,
            minLength: 10,
          }),
        ),
        tensor => {
          const mappedTensor = map(tensor, a => a) as Array<Array<Tensor>>;
          expect(mappedTensor).toEqual(tensor);
        },
      ),
    );
  });

  test('turn vector of different values to vectors of 1', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 255 })), vector => {
        const vectorOfOnes = map(vector, () => 1) as Array<Tensor>;
        vectorOfOnes.forEach(scalar => {
          expect(scalar).toBe(1);
        });
      }),
    );
  });

  test('turn matrix of different values to matrix of ones', () => {
    fc.assert(
      fc.property(fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { maxLength: 10, minLength: 10 })), matrix => {
        const matrixOfOnes = map(matrix, () => 1) as Array<Array<Tensor>>;
        matrixOfOnes.forEach(vector => {
          vector.forEach(scalar => {
            expect(scalar).toBe(1);
          });
        });
      }),
    );
  });

  test('turn 3D tensor of different values to 3D tensor of ones', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { maxLength: 10, minLength: 10 }), {
            maxLength: 10,
            minLength: 10,
          }),
        ),
        tensor => {
          const tensorOfOnes = map(tensor, () => 1) as Array<Array<Array<Tensor>>>;
          tensorOfOnes.forEach(matrix => {
            matrix.forEach(vector => {
              vector.forEach(scalar => {
                expect(scalar).toBe(1);
              });
            });
          });
        },
      ),
    );
  });
});
