import { tensorGuard } from '@tensor/tensorGuard';
import { pointwise } from '@tensor/operations/pointwise';
import { Tensor } from '@tensor/types';

export const tresholdRaw = (tensor: Tensor, treshold: number, aboveTreshold = 255, belowTreshold = 0): Tensor => {
  return pointwise(tensor, (scalar: number) => (scalar >= treshold ? aboveTreshold : belowTreshold));
};

export const treshold = tensorGuard(tresholdRaw);
