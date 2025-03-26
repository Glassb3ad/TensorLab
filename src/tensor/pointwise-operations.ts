import { pointwise } from './operations/pointwise';
import { Tensor } from './types';

export const treshold = (tensor: Tensor, treshold: number, aboveTreshold = 1, belowTreshold = 0): Tensor => {
  return pointwise(tensor, (scalar: number) => (scalar >= treshold ? aboveTreshold : belowTreshold));
};
