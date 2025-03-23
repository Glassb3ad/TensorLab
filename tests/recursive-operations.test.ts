import { expect, test, describe } from 'vitest';
import { Coordinates, Tensor } from '../src/tensor';
import { fold, insert, map, max, min } from '../src/recursive-operations';
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

describe('max', () => {
  test('return argument itself when argument is scalar', () => {
    const scalar: Tensor = 1;
    const maxValue = max(scalar);
    expect(maxValue).toBe(scalar);
  });

  test('return max value from tensor', () => {
    const tensor: Tensor = [1, 8, 3, 4];
    const maxValue = max(tensor);
    expect(maxValue).toBe(8);
  });

  test('Max value can be zero', () => {
    const tensor: Tensor = [0, 0, 0, 0];
    const maxValue = max(tensor);
    expect(maxValue).toBe(0);
  });

  test('return max value from matrix', () => {
    const matrix: Tensor = [
      [1, 8, 3, 4],
      [1, 8, 20, 4],
      [1, 8, 13, 4],
    ];
    const maxValue = max(matrix);
    expect(maxValue).toBe(20);
  });
});

describe('min', () => {
  test('return argument itself when argument is scalar', () => {
    const scalar: Tensor = 1;
    const minValue = min(scalar);
    expect(minValue).toBe(scalar);
  });

  test('return min value from tensor', () => {
    const tensor: Tensor = [1, 8, 3, 4];
    const minValue = min(tensor);
    expect(minValue).toBe(1);
  });

  test('Returns zero when it is minimum value', () => {
    const tensor: Tensor = [1, 0, 8, 3, 4];
    const minValue = min(tensor);
    expect(minValue).toBe(0);
  });

  test('return min value from matrix', () => {
    const matrix: Tensor = [
      [12, 8, 3, 4],
      [15, 8, 2, 4],
      [24, 8, 13, 4],
    ];
    const minValue = min(matrix);
    expect(minValue).toBe(2);
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

describe('insert', () => {
  test('adding new value to vector, changes only the scalar in given location', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }),
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 9 }),
        (vector, value, location) => {
          const modifiedVector = insert(vector, value, [location]) as Array<Tensor>;
          modifiedVector.forEach((scalar, i) => {
            if (i === location) {
              expect(scalar).toBe(value);
            } else {
              expect(scalar).toBe(vector[i]);
            }
          });
        },
      ),
    );
  });

  test('adding new value to matrix, changes only the scalar in given location', () => {
    fc.assert(
      fc.property(
        fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }), {
          minLength: 10,
          maxLength: 10,
        }),
        fc.integer({ min: 0, max: 255 }),
        fc.array(fc.integer({ min: 0, max: 9 }), { minLength: 2, maxLength: 2 }),
        (matrix, value, location) => {
          const modifiedMatrix = insert(matrix, value, location) as Array<Array<Tensor>>;
          modifiedMatrix.forEach((vector, i) => {
            vector.forEach((scalar, j) => {
              if (i === location[0] && j === location[1]) {
                expect(scalar).toBe(value);
              } else {
                expect(scalar).toBe(matrix[i][j]);
              }
            });
          });
        },
      ),
    );
  });

  test('adding new value to 3D tensor, changes only the scalar in given location', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.array(fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }), {
            minLength: 10,
            maxLength: 10,
          }),
          {
            minLength: 10,
            maxLength: 10,
          },
        ),
        fc.integer({ min: 0, max: 255 }),
        fc.array(fc.integer({ min: 0, max: 9 }), { minLength: 3, maxLength: 3 }),
        (tensor, value, location) => {
          const modifiedTensor = insert(tensor, value, location) as Array<Array<Array<Tensor>>>;
          modifiedTensor.forEach((matrix, i) => {
            matrix.forEach((vector, j) => {
              vector.forEach((scalar, l) => {
                if (i === location[0] && j === location[1] && l == location[2]) {
                  expect(scalar).toBe(value);
                } else {
                  expect(scalar).toBe(tensor[i][j][l]);
                }
              });
            });
          });
        },
      ),
    );
  });

  test('adding value to location outside of vector returns equal vector', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 0, max: 255 }), { minLength: 10, maxLength: 10 }),
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 10, max: 20 }),
        (vector, value, location) => {
          const modifiedVector = insert(vector, value, [location]) as Array<Tensor>;
          expect(vector).toEqual(modifiedVector);
        },
      ),
    );
  });
});
