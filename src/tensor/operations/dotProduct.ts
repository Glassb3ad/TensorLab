import { haveEqualShape } from '@tensor/predicates/shapePredicates';
import { Tensor } from '@tensor/types';

const dotProductRec = (t1: Tensor, t2: Tensor): Tensor => {
  if (Array.isArray(t1) && Array.isArray(t2)) {
    const sum = t1.reduce((pre, cur, index) => (dotProductRec(cur, t2[index]) as number) + (pre as number), 0);
    return sum;
  }
  return (t1 as number) * (t2 as number);
};

export const dotProduct = (t1: Tensor, t2: Tensor): Tensor => {
  if (!haveEqualShape(t1, t2)) {
    throw new Error('tensors must have same dimensions');
  }
  return dotProductRec(t1, t2);
};
