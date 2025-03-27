import { haveEqualShape } from '@tensor/predicates/shapePredicates';
import { Tensor } from '@tensor/types';
import { tensorGuard } from '../tensorGuard';

const addRaw = (t1: Tensor, t2: Tensor): Tensor => {
  if (!haveEqualShape(t1, t2)) {
    throw new Error('tensors have different shapes');
  }
  if (Array.isArray(t1) && Array.isArray(t2)) {
    return t1.map((tensor, index) => add(tensor, t2[index]));
  }
  return (t1 as number) + (t2 as number);
};

export const add = tensorGuard(addRaw);
