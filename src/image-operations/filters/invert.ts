import { Tensor } from '@tensor/types';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { max } from '@tensor/properties/max';
import { tensorGuard } from '@tensor/tensorGuard';

export const invertRaw = (tensor: Tensor) => {
  const maxValue = max(tensor);
  return pointwiseRaw(tensor, scalar => maxValue - scalar);
};

export const invert = tensorGuard(invertRaw);
