import { Tensor } from '@tensor/types';
import { pointwise } from '@tensor/operations/pointwise';
import { max } from '@tensor/properties/max';
import { tensorGuard } from '@tensor/tensorGuard';

export const invertRaw = (tensor: Tensor) => {
  const maxValue = max(tensor);
  return pointwise(tensor, scalar => maxValue - scalar);
};

export const invert = tensorGuard(invertRaw);
