import { expect, test, describe } from 'vitest';
import fc from 'fast-check';
import { insert } from '../../../src/tensor/mutations/insert';
import { Tensor } from '../../../src/tensor/types';

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
