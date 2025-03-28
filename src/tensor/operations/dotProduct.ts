import { haveEqualShape } from '@tensor/predicates/shapePredicates';
import { Scalar, Tensor } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

const dotProductRec = (t1: Tensor, t2: Tensor): Scalar => {
  if (Array.isArray(t1) && Array.isArray(t2)) {
    const sum = t1.reduce((acc: Scalar, cur: Tensor, index) => dotProductRec(cur, t2[index]) + acc, 0);
    return sum;
  }
  return (t1 as Scalar) * (t2 as Scalar);
};

export const dotProductRaw = (t1: Tensor, t2: Tensor): Scalar => {
  if (!haveEqualShape(t1, t2)) {
    throw new Error('tensors must have the same shape');
  }
  return dotProductRec(t1, t2);
};

export const dotProduct = tensorGuard(dotProductRaw, 2);
