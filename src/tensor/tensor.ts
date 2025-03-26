import { Tensor } from './types';

type TensorArg = Array<TensorArg> | number;

export const createTensorFromArray = (tensor: TensorArg): Tensor => {
  //TODO check that arrays have the same length
  return tensor;
};
