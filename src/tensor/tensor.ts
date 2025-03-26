import { haveEqualShape } from './shapePredicates';
import { Tensor } from './types';

type TensorArg = Array<TensorArg> | number;

export const createTensorFromArray = (tensor: TensorArg): Tensor => {
  //TODO check that arrays have the same length
  return tensor;
};

export const add = (t1: Tensor, t2: Tensor): Tensor => {
  if (!haveEqualShape(t1, t2)) {
    throw new Error('tensors have unequal dimensions');
  }
  if (Array.isArray(t1) && Array.isArray(t2)) {
    return t1.map((tensor, index) => add(tensor, t2[index]));
  }
  return (t1 as number) + (t2 as number);
};
