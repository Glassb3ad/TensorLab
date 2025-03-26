import { Tensor } from './types';

export const pointwise = (tensor: Tensor, operation: (arg: number) => number): Tensor => {
  if (Array.isArray(tensor)) {
    return tensor.map(t => pointwise(t, operation));
  }
  return operation(tensor);
};

export const mapToZero = (tensor: Tensor): Tensor => {
  return pointwise(tensor, () => 0);
};

export const treshold = (tensor: Tensor, treshold: number, aboveTreshold = 1, belowTreshold = 0): Tensor => {
  return pointwise(tensor, (scalar: number) => (scalar >= treshold ? aboveTreshold : belowTreshold));
};
