import { Tensor } from './tensor';

export const createTresholdOperation =
  (treshold: number, aboveTreshold = 1, underTreshold = 0) =>
  (scalar: number): number =>
    scalar >= treshold ? aboveTreshold : underTreshold;

export const treshold = (tensor: Tensor, treshold: number, aboveTreshold?: number, underTreshold?: number): Tensor => {
  return Tensor.elementWise(tensor, createTresholdOperation(treshold, aboveTreshold, underTreshold));
};
