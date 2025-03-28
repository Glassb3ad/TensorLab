import { haveEqualShape, isScalar } from '@tensor/predicates/shapePredicates';
import { Tensor } from '@tensor/types';
import { tensorGuard } from '../tensorGuard';
import { Scalar } from '../../../dist';

const combineRawRec = (t1: Tensor, t2: Tensor, combineScalars: (x: Scalar, y: Scalar) => Scalar): Tensor => {
  if (!isScalar(t1) && !isScalar(t2)) {
    return t1.map((tensor, index) => combineRaw(tensor, t2[index], combineScalars));
  }
  return combineScalars(t1 as Scalar, t2 as Scalar);
};

const combineRaw = (t1: Tensor, t2: Tensor, combineScalars: (x: Scalar, y: Scalar) => Scalar): Tensor => {
  if (!haveEqualShape(t1, t2)) {
    throw new Error('tensors have different shapes');
  }
  return combineRawRec(t1, t2, combineScalars);
};

export const combine = tensorGuard(combineRaw, 2);
