import { haveEqualShape } from '@tensor/predicates/shapePredicates';
import { Tensor } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

const dotProductRec = (t1: Tensor, t2: Tensor): Tensor => {
  if (Array.isArray(t1) && Array.isArray(t2)) {
    const sum = t1.reduce((pre, cur, index) => (dotProductRec(cur, t2[index]) as number) + (pre as number), 0);
    return sum;
  }
  return (t1 as number) * (t2 as number);
};

export const dotProductRaw = (t1: Tensor, t2: Tensor): Tensor => {
  if (!haveEqualShape(t1, t2)) {
    throw new Error('tensors must have the same shape');
  }
  return dotProductRec(t1, t2);
};

export const dotProduct = tensorGuard(dotProductRaw);
