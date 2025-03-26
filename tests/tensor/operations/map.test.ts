import fc from 'fast-check';
import { describe, test, expect } from 'vitest';
import { map } from '../../../src/tensor/operations/map';
import { Tensor } from '../../../src/tensor/types';

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
