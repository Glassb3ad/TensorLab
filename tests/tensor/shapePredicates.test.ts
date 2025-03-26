import { describe, test, expect } from 'vitest';
import { haveEqualShape, is3D, isMatrix, isScalar, isVector } from '../../src/tensor/shapePredicates';

describe('isScalar', () => {
  test('return true when tensor is scalar', () => {
    const tensor = 1;
    expect(isScalar(tensor)).toBe(true);
  });

  test('return false when tensor is matrix', () => {
    const tensor = [1];
    expect(isScalar(tensor)).toBe(false);
  });
});

describe('isVector', () => {
  test('return true when tensor is vector', () => {
    const tensor = [1];
    expect(isVector(tensor)).toBe(true);
  });

  test('return false when tensor is matrix', () => {
    const tensor = [[1]];
    expect(isVector(tensor)).toBe(false);
  });
});

describe('isMatrix', () => {
  test('return true when tensor is matrix', () => {
    const tensor = [[1], [2]];
    expect(isMatrix(tensor)).toBe(true);
  });

  test('return false when tensor is vector', () => {
    const tensor = [1];
    expect(isMatrix(tensor)).toBe(false);
  });
});

describe('i3d', () => {
  test('return true when tensor had 3 dimensions', () => {
    const tensor = [[[1]], [[2]]];
    expect(is3D(tensor)).toBe(true);
  });

  test('return false when tensor is matrix', () => {
    const tensor = [1];
    expect(is3D(tensor)).toBe(false);
  });
});

describe('haveEqualShape', () => {
  test('Two scalars have equal shape', () => {
    const t1 = 1;
    const t2 = 2;
    expect(haveEqualShape(t1, t2)).toBe(true);
  });

  test('Scalars and matrix have different shape', () => {
    const t1 = 1;
    const t2 = [1, 2];
    expect(haveEqualShape(t1, t2)).toBe(false);
  });

  test('Matrices of different length have different shape', () => {
    const t1 = [1, 1, 1];
    const t2 = [1, 2];
    expect(haveEqualShape(t1, t2)).toBe(false);
  });

  test('Vector and matrix have different shapes', () => {
    const t1 = [1, 2];
    const t2 = [
      [1, 1],
      [1, 1],
    ];
    expect(haveEqualShape(t1, t2)).toBe(false);
  });
});
