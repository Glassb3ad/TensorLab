import { Tensor } from '@tensor/types';
import { pointwiseRaw } from './pointwise';
import { tensorGuard } from '@tensor/tensorGuard';

export const mapToZeroRaw = (tensor: Tensor): Tensor => {
  return pointwiseRaw(tensor, () => 0);
};

export const mapToZero = tensorGuard(mapToZeroRaw);
