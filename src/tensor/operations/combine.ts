import { haveEqualShape, isScalar } from '@tensor/predicates/shapePredicates';
import { Scalar, Tensor } from '@tensor/types';
import { tensorGuard } from '../tensorGuard';

const combineRawRec = (t1: Tensor, t2: Tensor, combineScalars: (x: Scalar, y: Scalar) => Scalar): Tensor => {
  if (isScalar(t1) && isScalar(t2)) {
    return combineScalars(t1, t2);
  }
  return (t1 as Array<Tensor>).map((tensor, index) => combineRaw(tensor, (t2 as Array<Tensor>)[index], combineScalars));
};

export const combineRaw = (t1: Tensor, t2: Tensor, combineScalars: (x: Scalar, y: Scalar) => Scalar): Tensor => {
  if (!haveEqualShape(t1, t2)) {
    throw new Error('tensors have different shapes');
  }
  return combineRawRec(t1, t2, combineScalars);
};

export const combine = tensorGuard(combineRaw, 2);
