import { Tensor } from './tensor';

export const pointwise = (tensor: Tensor, operation: (arg: number) => number): Tensor => {
  if (Array.isArray(tensor)) {
    return tensor.map(t => pointwise(t, operation));
  }
  return operation(tensor);
};

export const createTresholdOperation =
  (treshold: number, aboveTreshold = 1, underTreshold = 0) =>
  (scalar: number): number =>
    scalar >= treshold ? aboveTreshold : underTreshold;

export const treshold = (tensor: Tensor, treshold: number, aboveTreshold?: number, underTreshold?: number): Tensor => {
  return pointwise(tensor, createTresholdOperation(treshold, aboveTreshold, underTreshold));
};
