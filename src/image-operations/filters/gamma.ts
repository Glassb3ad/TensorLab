import { tensorGuard } from '@tensor/tensorGuard';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { Tensor } from '@tensor/types';

const normalize = (tensor: Tensor) => pointwiseRaw(tensor, scalar => scalar / 255);
const invertNormalize = (tensor: Tensor) => pointwiseRaw(tensor, scalar => scalar * 255);

export const gammaRaw = (tensor: Tensor, power: number, c = 1.0) => {
  const gammatized = pointwiseRaw(normalize(tensor), scalar => c * Math.pow(scalar, power));
  return invertNormalize(gammatized);
};

export const gamma = tensorGuard(gammaRaw);
