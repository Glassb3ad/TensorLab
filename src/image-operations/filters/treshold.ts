import { tensorGuard } from '@tensor/tensorGuard';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { Tensor, Scalar } from '@tensor/types';

export const tresholdRaw = (tensor: Tensor, treshold: number, aboveTreshold = 255, belowTreshold = 0): Tensor => {
  const transformPixel = (pixel: Scalar) => (pixel >= treshold ? aboveTreshold : belowTreshold);
  return pointwiseRaw(tensor, transformPixel);
};

export const treshold = tensorGuard(tresholdRaw);
