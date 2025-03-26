import { Tensor } from '../types';

export const pointwise = (tensor: Tensor, operation: (arg: number) => number): Tensor => {
  if (Array.isArray(tensor)) {
    return tensor.map(t => pointwise(t, operation));
  }
  return operation(tensor);
};
