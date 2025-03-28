import { Tensor } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

export const pointwiseRaw = (tensor: Tensor, func: (arg: number) => number): Tensor => {
  if (Array.isArray(tensor)) {
    return tensor.map(t => pointwiseRaw(t, func));
  }
  return func(tensor);
};

export const pointwise = tensorGuard(pointwiseRaw);
