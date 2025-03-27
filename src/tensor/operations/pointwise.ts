import { Tensor } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

const pointwiseRaw = (tensor: Tensor, operation: (arg: number) => number): Tensor => {
  if (Array.isArray(tensor)) {
    return tensor.map(t => pointwiseRaw(t, operation));
  }
  return operation(tensor);
};

export const pointwise = tensorGuard(pointwiseRaw);
