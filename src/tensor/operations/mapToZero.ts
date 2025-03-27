import { Tensor } from '@tensor/types';
import { pointwise } from './pointwise';
import { tensorGuard } from '@tensor/tensorGuard';

export const mapToZeroRaw = (tensor: Tensor): Tensor => {
  return pointwise(tensor, () => 0);
};

export const mapToZero = tensorGuard(mapToZeroRaw);
