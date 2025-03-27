import { Scalar, Tensor } from '@tensor/types';

export const isScalar = (t: Tensor): t is Scalar => typeof t === 'number';

export const isVector = (t: Tensor): t is Array<Scalar> => !isScalar(t) && isScalar(t[0]);

export const isMatrix = (t: Tensor): t is Array<Array<Scalar>> => !isScalar(t) && isVector(t[0]);

export const is3D = (t: Tensor): t is Array<Array<Array<Scalar>>> => !isScalar(t) && isMatrix(t[0]);

export const haveEqualShape = (t1: Tensor, t2: Tensor): boolean => {
  if (isScalar(t1) && isScalar(t2)) {
    return true;
  }
  if (isScalar(t1) || isScalar(t2)) {
    return false;
  }
  if (t1.length !== t2.length) {
    return false;
  }
  return haveEqualShape(t1[0], t2[0]);
};
